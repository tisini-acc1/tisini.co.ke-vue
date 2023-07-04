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
import { qSetStatus } from "@/utils/QsetStatus";
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
    const startDateTime = moment(qset?.start_datetime);
    const endDateTime = moment(qset?.end_datetime);
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
const qsetCurrentStatus = computed(() => {
  const status = qSetStatus.getStatus(getCurrentQuestionSet.value!);
  switch (status) {
    case "not-started":
      return {
        text: "Yet to start",
        status: status,
      };
    case "in-progress":
      return {
        text: "In progress",
        status: status,
      };
    case "closed":
      return {
        text: "Ended",
        status: status,
      };
    default:
      return {
        text: "Yet to start",
        status: "not-started",
      };
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-start pt-8 min-h-screen">
    <div class="bg-white border p-6 rounded-lg shadow-lg w-1/2" v-if="getCurrentQuestionSet">
      <h2 class="text-2xl font-bold mb-4">Quiz Information</h2>

      <div class="mb-4 flex items-center gap-2">
        <label class="font-bold">Title:</label>
        <p class="font-medium text-lg">
          {{ getCurrentQuestionSet!.category_name }}
        </p>
        </div>
        <!-- amount payable -->

        <div class="flex items-center mb-4 gap-2">
          <label class="font-bold">Amount payable:</label>
          <p >
            {{ getCurrentQuestionSet!.amount_payable }}
          </p>
        </div>

        <!-- prize won -->
        <div class="flex items-center mb-4 gap-2 block">
          <label class="font-bold">Prize:</label>
          <p>
            {{ getCurrentQuestionSet!.prize_won ? getCurrentQuestionSet.prize_won : "Not set" }}
          </p>
      </div>
      <div class="mb-4 flex">
        <label class="font-bold mr-2"> Start Time:</label>
        <p>
          {{
            moment(qSetStatus.getStartDate(getCurrentQuestionSet!)).format(
              "LLL"
            )
          }}
        </p>
      </div>
      <div class="mb-4 flex gap-2">
        <label class="font-bold mr-2"> End Time:</label>
        <p>
          {{
            moment(qSetStatus.getEndDate(getCurrentQuestionSet!)).format("LLL")
          }}
        </p>
      </div>

      <div class="mb-4">
        <label class="font-bold mr-2"> Status:</label>
        <span :class="qSetStatus.getBadgeColor(getCurrentQuestionSet!)">{{
          qsetCurrentStatus.text
        }}</span>
      </div>

      <div class="mb-4">
        <button @click="startQuiz" type="button" href="#" class="bg-primary text-light px-4 py-2 rounded hover:bg-primary"
          :disabled="qsetCurrentStatus.status !== 'in-progress'"
          :class="qsetCurrentStatus.status !== 'in-progress' ? 'opacity-50 cursor-not-allowed' : ''">
          Start Quiz
        </button>
      </div>
    </div>
  </div>
</template>
