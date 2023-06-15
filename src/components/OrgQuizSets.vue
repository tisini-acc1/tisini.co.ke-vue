<script setup lang="ts">
import { getTisiniOrganizations } from "@/api/requests/base.jsx";
import useQuizStore from "@/store/useQuizStore";
import combineDateAndTime from "@/utils/combineDateAndTime";
import shuffleItems from "@/utils/shuffleItems";
import moment from "moment";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { OrganizationInterface } from "@/types";
const quizStore = useQuizStore();
const { getOrganizations, getCurrentQuestionSet } = storeToRefs(quizStore);
const router = useRouter();
// const queryCategory = router.currentRoute.value.query.queryCategory as string;
// const getKeyFromParams = (key: string) => {
//   return router.currentRoute.value.query[key] as string;
// };
const orgLength = computed(() => quizStore.organizations.length);
const qsetId = router.currentRoute.value.params.qsetId as string;
const orgId = router.currentRoute.value.query.orgId as string;
// console.log({ qsetId, orgId, orgLength, orgs: getOrganizations.value });

onBeforeMount(() => {
  if (quizStore.organizations.length === 0) {
    getTisiniOrganizations((data: OrganizationInterface[], err: any) => {
      if (err) {
        console.log({ err });
        // return;
      }
      // duplicate the data 6 times
      // data = data.concat(data, data, data, data, data);
      // console.log({ data });
      quizStore.loadOrganizations(data ?? []);
    });
  }

  //   quizStore.loadSingleQuestionSet(qsetId.value, orgId.value);
});
watch(orgLength, (newVal, oldVal) => {
  console.log({ newVal, oldVal });
  if (newVal > 0) {
    console.log({ qsetId, orgId, orgLength, orgs: getOrganizations.value });
    const currentOrg = getOrganizations.value.find((org) => {
      // console.log({ orgId, org: org.uid });
      return org.uid === orgId;
    });
    // console.log({ currentOrg });
    quizStore.setCurrentOrganization(currentOrg!);
    const currentQset = currentOrg?.question_sets.find(
      (qset) => qset.uid === qsetId
    );
    // console.log({ currentOrg, currentQset });
    quizStore.setCurrentQuerySet(currentQset!);
  }
});
onMounted(() => {
    // console.log({ qsetId, orgId, orgLength, orgs: getOrganizations.value });
    const currentOrg = getOrganizations.value.find((org) => {
      // console.log({ orgId, org: org.uid });
      return org.uid === orgId;
    });
    // console.log({ currentOrg });
    quizStore.setCurrentOrganization(currentOrg!);
    const currentQset = currentOrg?.question_sets.find(
      (qset) => qset.uid === qsetId
    );
    // console.log({ currentOrg, currentQset });
    quizStore.setCurrentQuerySet(currentQset!);
});
const quizSetStatus = computed(() => {
  const qset = getCurrentQuestionSet.value;
  if (qset) {
    const startDateTime = combineDateAndTime(
      qset?.play_date!,
      qset?.start_time!
    );
    const endDateTime = combineDateAndTime(qset?.play_date!, qset?.end_time!);
    const isStarted =
      moment().isSameOrAfter(startDateTime) &&
      moment().isSameOrBefore(endDateTime);
    const isEnded = moment().isAfter(endDateTime);
    const isYetToStart = ref(moment().isBefore(startDateTime));
    return {
      isStarted,
      isEnded,
      isYetToStart,
      startDateTime,
      endDateTime,
    };
  }
});
const startQuiz = () => {
  console.log("start quiz");
  const questionsToPlay = getCurrentQuestionSet.value?.questions;
  quizStore.loadQuestions(shuffleItems(questionsToPlay!));
  quizStore.setCurreQuestionIndex(0);
  quizStore.syncState();
  router.push({
    name: "play-quiz",
    query: {
      orgId: orgId,
      qsetId: qsetId,
    },
    params: {
      qsetId: qsetId,
      orgId: orgId,
    },
  });
};
</script>

<template>
  <div class="flex flex-col r items-center h-full p-4 min-h-screen">
    <div
      class="max-w-xl shadow w-full border p-4 rounded flex flex-col gap-2"
      v-if="getCurrentQuestionSet"
    >
      <h1 class="font-bold text-2xl">
        {{ getCurrentQuestionSet?.category_name }}
      </h1>
      <p class="font-medium text-blue-500">
        {{
          quizSetStatus!.isStarted
            ? "On going"
            : quizSetStatus!.isYetToStart
            ? "Yet to start"
            : "Ended"
        }}

        <!-- {{ quizSetStatus }} -->
      </p>
      <p class="font-medium text-blue-500">
        Play date: &nbsp;
        <strong class="font-bold text-xl">
          {{
            combineDateAndTime(
              getCurrentQuestionSet?.play_date!,
              getCurrentQuestionSet?.start_time!
            ).format("LLL")
          }}
        </strong>
      </p>
      <p class="font-medium text-blue-500">
        End date: &nbsp;
        <strong class="font-bold text-xl">
          {{
            combineDateAndTime(
              getCurrentQuestionSet?.play_date!,
              getCurrentQuestionSet?.end_time!
            ).format("LLL")
          }}
        </strong>
      </p>
      <button
        class="bg-blue-500 text-white rounded p-2"
        @click="startQuiz"
        v-if="startQuiz"
      >
        Start playing
      </button>
    </div>
  </div>
</template>
