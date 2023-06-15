<script lang="ts" setup>
import { OrganizationInterface } from "@/types";
import { onMounted } from "vue";
import { useQuizStore } from "@/store/useQuizStore";
import OrganizationQuizCard from "@/components/OrgQuizCard.vue";
import { getTisiniOrganizations } from "@/api/requests/base.jsx";
const quizStore = useQuizStore();
onMounted(() => {
  getTisiniOrganizations((data: OrganizationInterface[], err: any) => {
    if (err) {
      console.log({ err });
      return;
    }
    // duplicate the data 6 times
    // data = data.concat(data, data, data, data, data);
    // console.log({ data });
    quizStore.loadOrganizations(data);
  });
  quizStore.loadQuestions([]);
});
</script>
<template>
  <main class="w-full min-h-screen">
    <div
      class="p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4"
    >
      <div
        v-for="org in quizStore.getOrganizations"
        class="bg-white shadow overflow-hidden rounded sm:rounded-lg"
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
