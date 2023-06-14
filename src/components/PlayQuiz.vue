<script setup lang="ts">
import { storeToRefs } from "pinia";
import useQuizStore from "@/store/useQuizStore";
import { ref, onMounted, watch, onBeforeMount } from "vue";
const {
  getCurrentQuestionSet,
  getCurrentQuestion,
  currentQuestionIndex,
  getCurrentAnswers,
} = storeToRefs(useQuizStore());

/**
 * Life cycles
 */
// Before mount
// mount
onMounted(() => {
  startTimer();
});
// beforeUpdate
// Before unmount
onBeforeMount(() => {
  clearInterval(timerId.value!);
});
/**
 * Data
 */
const quizStore = useQuizStore();
const answer = ref<string>("");
const timerId = ref<NodeJS.Timer | null>(null);
const questionTimer = ref<number>(getCurrentQuestion.value?.timer ?? 0);
const timeDelay = ref<number>(1000);

/**
 * Watchers
 */
watch(answer, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    quizStore.answerQuestion(
      getCurrentQuestion.value?.answers.filter(
        (ans) => ans.answer === newVal
      )[0]!,
      questionTimer.value
    );
    clearInterval(timerId.value!);
  }
});
watch(
  () => getCurrentQuestion.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      questionTimer.value = getCurrentQuestion.value?.timer ?? 0;
      startTimer();
    }
  }
);

/**
 * Methods
 */
const nextQuestion = () => {
  if (
    currentQuestionIndex.value <
    getCurrentQuestionSet.value!?.questions!.length - 1
  ) {
    quizStore.moveTonextQuestion();
  } else {
    console.log("end of questions");
  }
};
const startTimer = () => {
  timerId.value = setInterval(() => {
    questionTimer.value =
      questionTimer.value <= 0 ? 0 : questionTimer.value - 1;
    quizStore.syncCurrentQuestionDuration(
      getCurrentQuestion.value?.timer! - questionTimer.value
    );
    if (questionTimer.value === 0 || getCurrentQuestion.value?.is_answered) {
      clearInterval(timerId.value!);
      //   quizStore.moveTonextQuestion();
    }
  }, timeDelay.value as number);
};
const submitQuiz = async () => {
  await quizStore.finishQuiz();
};
</script>

<template>
  <div class="p-4 border my-4 rounded flex flex-col gap-2">
    <div class="flex justify-between">
      <h1 class="font-bold text-2xl text-blue-700">
        {{ getCurrentQuestionSet?.category_name }}
      </h1>
      <div class="flex justify-center items-center">
        <span class="font-bold text-2xl text-blue-700">
          {{ questionTimer }}
        </span>
        <span class="font-bold text-2xl text-blue-700">s</span>
      </div>
      <div>
        <span class="border rounded p-2">
          {{ quizStore.currentQuestionIndex + 1 }} of
          {{ getCurrentQuestionSet?.questions?.length }} Question{{
            `${getCurrentQuestionSet?.questions?.length! > 1 ? "s" : ""}`
          }}
        </span>
      </div>
    </div>
    <hr />

    <h1 class="font-medium text-xl">
      {{ getCurrentQuestion?.question }}
    </h1>
    <div
      v-if="getCurrentQuestion?.image"
      class="w-full h-64 bg-cover bg-center"
    >
      <img
        :src="getCurrentQuestion?.image"
        class="aspect-auto h-64 bg-cover bg-center"
      />
    </div>
    <label
      class="flex flex-col gap-2"
      v-for="option in getCurrentAnswers!"
      for="answer"
    >
      <p
        class="flex gap-2 items-center p-2 rounded"
        :class="{
          'bg-green-500 text-white':
            option.is_answer &&
            getCurrentQuestion?.is_answered &&
            getCurrentQuestion.selected_answer?.answer === option.answer,
          'bg-red-500 text-white':
            !option.is_answer &&
            getCurrentQuestion?.is_answered &&
            getCurrentQuestion.selected_answer?.answer === option.answer,
        }"
      >
        <input
          class="border p-2 rounded"
          type="radio"
          :key="option.uid"
          name="answer"
          :disabled="getCurrentQuestion?.is_answered"
          v-model="answer"
          :value="option.answer"
        />
        {{ option.answer }}
      </p>
    </label>
    <div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="nextQuestion"
        v-if="
          quizStore.currentQuestionIndex <
          getCurrentQuestionSet?.questions?.length! - 1
        "
      >
        Next
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="submitQuiz"
        v-else
      >
        Submit
      </button>
    </div>
  </div>
</template>
