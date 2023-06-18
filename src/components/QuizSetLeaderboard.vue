<script setup lang="ts">
import { QsetPlayer2, QuizSetLeaderBoardSummaryPayload } from "@/types";
import { ref, onMounted, computed } from "vue";
import { getQuestionSetLeaderBoards } from "@/api/requests/base";
import { useRouter } from "vue-router";
import Loader from "./Loader.vue";
import { useToast } from "vue-toast-notification";

const router = useRouter();
const leaderBoard = ref<QuizSetLeaderBoardSummaryPayload>(
  {} as QuizSetLeaderBoardSummaryPayload
);
const toast = useToast();
const isLoading = ref<boolean>(false);
const baseGravatar = ref<string>(
  "https://gravatar.com/avatar/cc8cbfcbd5bc4908182252d212020d52?d=mp"
);
const qsetId = ref<string>(router.currentRoute.value.params.qsetId as string);
const computeScore = (player: QsetPlayer2) => {
  if (!player || !player.points || !player.timer) {
    return 0;
  }
  const points = player.points;
  const timer = player.timer;
  const score = points - timer;

  return score;
};
const participantsLength = computed(() => {
  if (leaderBoard.value) {
    const len =
      Array.isArray(leaderBoard.value.question_players) &&
      leaderBoard.value.question_players
        ? leaderBoard.value.question_players!.length
        : 0;
    return len;
  }
  return 0;
});

onMounted(() => {
  const loadLeaderBoard = () => {
    isLoading.value = true;
    getQuestionSetLeaderBoards(qsetId.value, (data: any, err: any) => {
      if (err) {
        // console.log({ err });

        isLoading.value = false;
        toast.error("Something went wrong", {
          position: "top-right",
        });
        return;
      } else {
        // console.log({ data });
        const lboard = data as QuizSetLeaderBoardSummaryPayload;
        if (lboard.question_players && lboard.question_players.length === 0) {
          leaderBoard.value = lboard;
          isLoading.value = false;
          return;
        }
        lboard.question_players =
          lboard.question_players && Array.isArray(lboard.question_players)
            ? lboard.question_players.map((player) => {
                player.score = computeScore(player.question_players);
                player.question_players.q_player.profile_pic =
                  player.question_players.q_player.profile_pic ??
                  baseGravatar.value;
                return player;
              })
            : [];
        lboard.question_players.sort((a, b) => {
          return b.score! - a.score!;
        });

        leaderBoard.value = lboard;
        isLoading.value = false;
      }
    });
  };
  Promise.allSettled([loadLeaderBoard()]);
});
</script>

<template>
  <main>
    <loader :is-loading="isLoading" />
    <div class="border p-4 my-2 rounded-2 shadow" v-if="participantsLength > 0">
      <div class="flex p-4">
        <h1 class="text-primary uppercase font-bold">
          {{ leaderBoard.category_name }}
        </h1>
      </div>
      <table class="min-w-full divide-y divide-gray-200 border border-collapse">
        <tr class="border">
          <th
            scope="col"
            class="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
          >
            #
          </th>
          <!-- <th
            scope="col"
            class="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
          >
            Image
          </th>  -->
          <th
            scope="col"
            class="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
          >
            Player
          </th>
          <th
            scope="col"
            class="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
          >
            Points
          </th>
          <th
            scope="col"
            class="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
          >
            Avg time
          </th>
          <!-- <th
            scope="col"
            class="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
          >
            Score
          </th> -->
        </tr>
        <tr
          v-for="(player, index) of leaderBoard.question_players"
          :key="index"
        >
          <td class="px-6 py-4 whitespace-nowrap border">{{ index + 1 }}</td>
          <!-- <td class="px-6 py-4 whitespace-nowrap border">
           <div class="flex items-center justify-center">
            <img
              :src="player.question_players.q_player.profile_pic!"
              class="w-10 h-10 rounded-full"
            />
           </div>
          </td> -->
          <td class="px-6 py-4 whitespace-nowrap border">
            <div>
              <div class="flex items-center">
                <!-- <div class="flex-shrink-0 h-8 w-8">
                  <img
                    :src="player.question_players.q_player.profile_pic!"
                    class="h-8 w-8 rounded-full"
                  />
                </div> -->
                <div class="ml-4 flex gap-1">
                  <div class="text-sm font-medium text-gray-900">
                    {{ player.question_players.q_player.first_name }}

                    {{ player.question_players.q_player.last_name }}
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap border">
            {{ player.question_players.points }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap border">
            {{ player.question_players.timer }}
          </td>
          <!-- <td class="px-6 py-4 whitespace-nowrap border">
            {{ player.score }}
          </td> -->
        </tr>
      </table>
    </div>
    <div v-else class="flex items-center justify-center min-h-[40vh]">
      <!-- Large banner -->
      <div class="flex flex-col items-center justify-center">
        <div class="flex items-center justify-center">
          <svg
            class="w-16 h-16 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v7h5a1 1 0 110 2h-6v3a1 1 0 11-2 0V6a1 1 0 011-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          No participants yet
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          <!-- Invite your friends to join the quiz -->
        </p>
        <div class="mt-6 flex gap-2">
          <!-- <button
            @click="router.push(`/quiz/${qsetId}/invite`)"
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Invite
          </button> -->
          <!-- Go back -->
          <button
            @click="router.back()"
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
