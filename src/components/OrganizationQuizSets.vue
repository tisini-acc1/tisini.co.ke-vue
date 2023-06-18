<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import Loader from "@/components/Loader.vue";
import { getSingleOrganizationQuestionSets } from "@/api/requests/base";
import { OrganizationInterface } from "@/types";
import OrgQuizCard from "./OrgQuizCard.vue";

const toast = useToast();
const router = useRouter();

const isLoading = ref<boolean>(false);
const orgId = router.currentRoute.value.params.orgId as string;
const organization = ref<OrganizationInterface>();

onMounted(() => {
  const fetchOrgQsets = () => {
    isLoading.value = true;
    getSingleOrganizationQuestionSets(orgId, (data: any, err: any) => {
      if (err) {
        // console.log({ err });
        toast.error("Something went wrong!", {
          position: "top-right",
        });
        isLoading.value = false;
        return;
      } else {
        // console.log({ data });
        const org = data as OrganizationInterface;
        org.question_sets = org.question_sets.filter(
          (qset) => qset.status !== "PL"
        );
        organization.value = org;
        isLoading.value = false;
      }
    });
  };
  Promise.allSettled([fetchOrgQsets()]);
});
</script>
<template>
  <div>
    <loader :is-loading="isLoading" />
    <!-- <h1>Organization Quiz Sets {{ orgId }}</h1> -->
    <div class="flex items-center py-2 border-b my-2">
      <!-- Go back -->
      <button
        class="flex items-center justify-center w-10 h-10 mr-2 text-gray-600 rounded-full hover:bg-gray-200"
        @click="router.back()"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15 19l-7-7 7-7"></path>
        </svg>
        <span class="sr-only">Back</span>
      </button>
      <!-- Organization Logo -->
      <img
        v-if="organization?.org_logo"
        :src="organization?.org_logo"
        alt=""
        class="w-10 h-10 rounded-full object-contain"
      />
      <!-- Organization Name -->

      <h1 class="text-2xl font-bold text-gray-800">
        {{ organization?.organization_name }}
      </h1>
    </div>
    <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
      <div
        v-if="organization"
        v-for="questionset in organization!.question_sets"
        :key="questionset.uid"
        class="bg-white shadow overflow-hidden rounded sm:rounded-lg border hover:shadow-lg hover:border-transparent transition duration-300 ease-in-out"
      >
        <div class="w-full">
          <img
            :src="organization?.org_logo!"
            alt=""
            class="w-full h-60 object-fill top-0 left-0"
          />
        </div>

        <div class="p-4 border-t">
          <ul class="">
            <org-quiz-card :org-id="organization!.uid" :qset="questionset" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
