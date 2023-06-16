<script setup lang="ts">
import { QsetPlayer2, QuizSetLeaderBoardSummaryPayload } from "@/types";
import { ref, onMounted } from "vue";
import { getQuestionSetLeaderBoards } from "@/api/requests/base";
import { useRouter } from "vue-router";
import Loader from "./Loader.vue";

const router = useRouter();
const qsets = ref<QuizSetLeaderBoardSummaryPayload>(
  {} as QuizSetLeaderBoardSummaryPayload
);
const isLoading = ref<boolean>(false);
const baseGravatar = ref<string>(
  "https://gravatar.com/avatar/cc8cbfcbd5bc4908182252d212020d52?d=mp"
);
const qsetId = ref<string>(router.currentRoute.value.params.qsetId as string);
const computeScore = (player: QsetPlayer2) => {
  const points = player.points;
  const timer = player.timer;
  const score = points - timer;

  return score;
};

onMounted(() => {
  const loadLeaderBoard = () => {
    isLoading.value = true;
    getQuestionSetLeaderBoards(qsetId.value, (data: any, err: any) => {
      if (err) {
        console.log({ err });
      } else {
        // console.log({ data });
        const lboard = data as QuizSetLeaderBoardSummaryPayload;
        lboard.question_players = lboard.question_players.map((player) => {
          player.score = computeScore(player.question_players);
          player.question_players.q_player.profile_pic =
            player.question_players.q_player.profile_pic ?? baseGravatar.value;
          return player;
        });
        lboard.question_players.sort((a, b) => {
          return b.score! - a.score!;
        });

        qsets.value = lboard;
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
    <div class="border p-4 my-2 rounded-2 shadow">
      <div class="flex p-4">
        <h1 class="text-primary uppercase font-bold">
          {{ qsets.category_name }}
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
        <tr v-for="(player, index) of qsets.question_players" :key="index">
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
  </main>
</template>
