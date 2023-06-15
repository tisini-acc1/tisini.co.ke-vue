<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useQuizStore } from "@/store/useQuizStore";
import { submitTisiniQuiz } from "@/api/requests/base";
import Loader from "@/components/Loader.vue";

const { getScoreSummary } = storeToRefs(useQuizStore());
const quizStore = useQuizStore();
const quizSubmitted = ref(false);
const isLoading = ref(false);
const submitQuiz = () => {
  isLoading.value = true;
  submitTisiniQuiz(
    getScoreSummary.value?.questionSetUid!,
    {
      question_players: {
        points: getScoreSummary.value?.score!,
        timer: isNaN(getScoreSummary.value!.avgDuration!)
          ? 0
          : (getScoreSummary.value?.avgDuration!.toFixed(
              2
            )! as unknown as number),
      },
    },
    (data: any, err: any) => {
      if (err) {
        console.log({ err });
        isLoading.value = false;
      } else {
        console.log({ data });
        quizSubmitted.value = true;
        quizStore.resetState()
        isLoading.value = false;
      }
    }
  );
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <loader :is-loading="isLoading" />
    <div
      class="p-6 m-4 bg-white border text-center rounded shadow-lg max-w-2xl w-full"
      v-if="!quizSubmitted">
      <h2 class="text-2xl font-bold mb-2">Finish Quiz</h2>
      <div class="space-y-4">
        <div>
          <h3 class="font-semibold text-lg">You scored</h3>
          <p class="text-xl font-bold text-blue-500">
            {{ getScoreSummary?.score }} points
          </p>
        </div>
        <div>
          <h3 class="font-semibold text-lg">Average time</h3>
          <p class="text-xl font-bold text-green-500">
            {{
              isNaN(getScoreSummary!?.avgDuration)
                ? 0
                : getScoreSummary?.avgDuration.toFixed(2)
            }}
            seconds
          </p>
        </div>
        <div>
          <h3 class="font-semibold text-lg">Total time</h3>
          <p class="text-xl font-bold text-red-500">
            {{ getScoreSummary?.totalDuration }} seconds
          </p>
        </div>
        <div>
          <h3 class="font-semibold text-lg">Number of questions</h3>
          <p class="text-xl font-bold text-purple-500">
            {{ getScoreSummary?.totalQuestions }}
          </p>
        </div>
        <!-- Submit -->
        <div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="submitQuiz">
            Submit
          </button>
        </div>
      </div>
    </div>
    <div>
      <h1 class="text-2xl font-bold mb-2" v-if="quizSubmitted">
        Quiz submitted
      </h1>
      <p class="text-xl font-bold text-blue-500" v-if="quizSubmitted">
        Thank you for participating
      </p>
      <div class="flex items-center gap-4">
        <router-link
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          :to="{
            name: 'quizset-leaderboard',
            params: { qsetId: getScoreSummary?.questionSetUid },
          }"
          v-if="quizSubmitted">
          Go to leaderboard
        </router-link>
        <router-link
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          :to="{ name: 'landing' }"
          v-if="quizSubmitted">
          Go to home
        </router-link>
      </div>
    </div>
  </div>
</template>
