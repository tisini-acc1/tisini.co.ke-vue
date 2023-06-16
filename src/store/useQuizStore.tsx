import { stateKeys } from "@/constants/state-keys";
import {
  AnswerInterface,
  OrganizationInterface,
  QuestionInterface,
  QuestionSetInterface,
  QuizStoreInterface,
} from "@/types";
import shuffleItems from "@/utils/shuffleItems";
import { defineStore } from "pinia";
import router from "@/router";
export const useQuizStore = defineStore("quizStore", {
  state: (): QuizStoreInterface => {
    const state = localStorage.getItem(stateKeys["tisini-app-quizState"])
      ? (JSON.parse(
          localStorage.getItem(stateKeys["tisini-app-quizState"])!
        ) as QuizStoreInterface)
      : null;
    return (
      state ?? {
        questionPlayers: [],
        currentQuestionPlayer: null,
        counter: 0,
        currentOrganization: null,
        currentQuestion: null,
        currentQuestionSet: null,
        organizations: [],
        isPlaying: false,
        questions: [],
        timer: 0,
        currentQuestionIndex: 0,
        scoreSummary: null,
        currentAnswers: [],
      }
    );
  },
  getters: {
    getQuestions: (state) => state.questions,
    getCurrentQuestion: (state) => state.currentQuestion,
    getCurrentQuestionIndex: (state) => state.currentQuestionIndex,
    getTimer: (state) => state.timer,
    getCurrentAnswers: (state) => state.currentQuestion?.answers,
    getOrganizations: (state) => state.organizations,
    getCurrentOrganization: (state) => state.currentOrganization,
    getCurrentQuestionSet: (state) => state.currentQuestionSet,
    getState: (state) => state,
    getQuestionsLength: (state) => state.questions.length,
    getScoreSummary: (state) => state.scoreSummary,
  },
  actions: {
    syncState() {
      localStorage.setItem(
        stateKeys["tisini-app-quizState"],
        JSON.stringify(this.$state)
      );
    },

    updateCounter(quizCounterLength: number) {
      // make counter run and update the counter until it reaches the quizCounterLength
      // run for seconds based on the quizCounterLength then stop
      if (this.counter < quizCounterLength) {
        this.counter++;
        setTimeout(this.updateCounter, 1000);
      } else {
        this.counter = 0;
      }
    },

    setCurrentQuerySet(qset: QuestionSetInterface) {
      // load single question set from the current organization
      this.currentQuestionSet = qset;
      this.loadQuestions(qset.questions);
      this.setCurreQuestionIndex(0);
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.scoreSummary = null;
      //   Set answers
      this.syncState();
      // fetch organizations from the server
      // set the organizations
    },

    loadOrganizations(orgs: OrganizationInterface[] = []) {
      this.organizations = orgs;
      // fetch organizations from the server
      // set the organizations
    },
    loadQuestions(questions: QuestionInterface[] = []) {
      this.questions = shuffleItems(questions);
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    },
    setCurrentOrganization(organization: OrganizationInterface | null) {
      // load organization from the organizations
      this.currentOrganization = organization!;
    },
    moveTonextQuestion() {
      this.setCurreQuestionIndex(this.currentQuestionIndex + 1);
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.currentAnswers = shuffleItems(this.currentQuestion?.answers ?? []);
      // move to the next question
    },

    setCurreQuestionIndex(index: number) {
      // set the current question index
      this.currentQuestionIndex = index;
      this.currentQuestion =
        index < this.questions.length ? this.questions[index] : null;
      this.currentAnswers = shuffleItems(this.currentQuestion?.answers ?? []);
    },
    answerQuestion(answer: AnswerInterface, seconds: number) {
      // answer the question
      this.currentQuestion!.selected_answer = answer;
      this.currentQuestion!.is_answered = true;
      this.currentQuestion!.duration = seconds;
      this.questions = this.questions.map((q) => {
        if (q.uid === this.currentQuestion!.uid) {
          q.selected_answer = answer;
          q.is_answered = true;
        }
        return q;
      });
      // set the current question answer
    },
    syncCurrentQuestionDuration(seconds: number) {
      // sync the current question duration
      this.currentQuestion!.duration = seconds;
      this.questions = this.questions.map((q) => {
        if (q.uid === this.currentQuestion!.uid) {
          q.duration = seconds;
        }
        return q;
      });
      // if (this.currentQuestion?.timer) {
      //   this.currentQuestion!.timer = seconds;
      // }
      this.syncState();
    },
    async finishQuiz() {
      // console.log("finish quiz");

      // finish the quiz
      const points = this.questions.reduce((acc, q) => {
        if (q.is_answered && q.selected_answer?.is_answer) {
          acc += q.points;
        }
        return acc;
      }, 0);
      // console.log("points", points);

      const totalDuration = this.questions.reduce((acc, q) => {
        acc += q.duration!;
        return acc;
      }, 0);
      // console.log("totalDuration", totalDuration);
      const avgDuration = totalDuration / this.questions.length;
      console.log("avg duration", avgDuration);

      const correctAnswers = this.questions.reduce((acc, q) => {
        if (q.selected_answer?.is_correct) {
          acc += 1;
        }
        return acc;
      }, 0);
      // console.log("correctAnswers", correctAnswers);

      this.scoreSummary = {
        organizationUid: this.currentOrganization!.uid,
        questionSetUid: this.currentQuestionSet!.uid,
        score: points,
        totalCorrectAnswers: correctAnswers,
        avgDuration: avgDuration,
        totalDuration: totalDuration,
        totalPoints: points,
        totalQuestions: this.questions.length,
        totalSkippedAnswers: this.questions.length - correctAnswers,
        totalWrongAnswers: this.questions.length - correctAnswers,
      };
      // console.log("scoreSummary", this.scoreSummary);
      this.syncState();
      await router.push({
        name: "completed-quiz",
        params: {
          orgId: this.currentOrganization?.uid,
          qsetId: this.currentQuestionSet?.uid,
        },
      });
      // set the isPlaying to false
    },
    timeoutQuestion() {
      // timeout the question
      this.currentQuestion!.is_answered = true;
      this.currentQuestion!.duration = this.currentQuestion!.timer;
      this.questions = this.questions.map((q) => {
        if (q.uid === this.currentQuestion!.uid) {
          q.is_answered = true;
          q.duration = this.currentQuestion!.timer;
          q.points = 0;
        }
        return q;
      });
      // set the current question answer
    },

    resetState() {
      this.currentQuestionPlayer = null;
      this.counter = 0;
      this.currentOrganization = null;
      this.currentQuestion = null;
      this.currentQuestionSet = null;
      this.organizations = [];
      this.isPlaying = false;
      this.questions = [];
      this.timer = 0;
      this.currentQuestionIndex = 0;
      this.scoreSummary = null;
      this.currentAnswers = [];
      localStorage.removeItem(stateKeys["tisini-app-quizState"]);
      this.syncState();
    },
  },
});

export default useQuizStore;
