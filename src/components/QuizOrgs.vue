<script lang="ts" setup>
import { OrganizationInterface } from "@/types";
import { onMounted } from "vue";
import { useQuizStore } from "@/store/useQuizStore";
import OrganizationQuizCard from "@/components/OrgQuizCard.vue";
import { getTisiniOrganizations } from "@/api/requests/base.jsx";
import { qSetStatus } from "@/utils/QsetStatus";
import Loader from "@/components/Loader.vue";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
const quizStore = useQuizStore();
const isLoading = ref<boolean>(true);
const toast = useToast();
onMounted(() => {
  const getOrgs = () => {
    isLoading.value = true;
    getTisiniOrganizations((data: OrganizationInterface[], err: any) => {
      if (err) {
        toast.open({
          message: "Something went wrong. Please try again later.",
          type: "error",
        });
        //
        isLoading.value = false;
        return;
      }
      // duplicate the data 6 times
      // data = data.concat(data, data, data, data, data);
      // console.log({ data });
      // Sort based on priority 1,2,3 with 1 being the highest
      const sorted =
        Array.isArray(data) &&
        data.length > 0 &&
        data.sort((a, b) => {
          const aPriority = qSetStatus.getPriority(a.question_sets[0]);
          const bPriority = qSetStatus.getPriority(b.question_sets[0]);
          return aPriority - bPriority;
        });
      quizStore.loadOrganizations(sorted as OrganizationInterface[]);
      isLoading.value = false;
    });
    quizStore.loadQuestions([]);
  };
  Promise.allSettled([getOrgs()]);
});
</script>
<template>
  <main class="w-full min-h-screen">
    <loader :is-loading="isLoading"/>
    <div
      class="p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4"
    >
      <div
        v-for="org in quizStore.getOrganizations"
        class="bg-white shadow overflow-hidden rounded sm:rounded-lg border hover:shadow-lg hover:border-transparent transition duration-300 ease-in-out"
      >
        <h1 class="p-2 font-bold uppercase">{{ org.organization_name }}</h1>
        <div class="w-full">
          <img
            :src="org.org_logo!"
            alt=""
            class="w-full h-60 object-fill top-0 left-0"
          />
        </div>
        <div class="p-4 border-t">
          <ul>
            <organization-quiz-card
              v-for="qset in org.question_sets"
              :key="qset.category_name"
              :org-id="org.uid"
              :qset="qset"
            />
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>
