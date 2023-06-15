<script setup lang="ts">
import { QuizSetLeaderBoardSummaryPayload } from "@/types";
import { ref, onMounted } from "vue";
import { getQuestionSetLeaderBoards } from "@/api/requests/base";
import { useRouter } from "vue-router";

const router = useRouter();
const qsets = ref<QuizSetLeaderBoardSummaryPayload[]>([]);
const qsetId = ref<string>(router.currentRoute.value.params.qsetId as string);
onMounted(() => {
  getQuestionSetLeaderBoards(qsetId.value,(data: any, err: any) => {
    if (err) {
      console.log({ err });
    } else {
      console.log({ data });
      qsets.value = (data as QuizSetLeaderBoardSummaryPayload[])
      // .filter(
      //   (qset) => qset.uid === router.currentRoute.value.params.qsetId
      // );
    }
  });
});
</script>

<template>
  <main>
    <div v-for="qset of qsets" class="border p-4 my-2 rounded-2 shadow">
      <h1>
        {{ qset.category_name }}
      </h1>
      <table class="min-w-full divide-y divide-gray-200 border border-collapse">
        <tr class="border">
          <th
            scope="col"
            class="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
            #
          </th>
          <th
            scope="col"
            class="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
            Player
          </th>
          <th
            scope="col"
            class="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
            Points
          </th>
          <th
            scope="col"
            class="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
            Avg time
          </th>
        </tr>
        <tr v-for="(player, index) of qset.question_players" :key="index">
          <td class="px-6 py-4 whitespace-nowrap border">{{ index + 1 }}</td>
          <td class="px-6 py-4 whitespace-nowrap border">
            {{ player.question_players.q_player.first_name }}
            {{ player.question_players.q_player.last_name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap border">
            {{ player.question_players.points }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap border">
            {{ player.question_players.timer }}
          </td>
        </tr>
      </table>
    </div>
  </main>
</template>
