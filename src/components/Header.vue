<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";

const { isAuthenticated } = storeToRefs(useAuthStore());
</script>
<template>
  <header class="w-full shadow-md sticky top-0 bg-primary z-[20000]">
    <div class="max-w-7xl mx-auto p-4 flex items-center justify-between">
      <div class="flex items-center gap-2 text-white uppercase">
        <fa icon="fa fa-home" ></fa>
        <router-link :to="{ name: 'landing' }" class="font-bold"
          >Tisini</router-link
        >
      </div>
      <div class="flex items-center justify-evenly gap-4">
        <ul class="flex items-center gap-4 capitalize">
          <li>
            <router-link :to="{ name: 'organization-quiz' }" class="text-white hover:text-gray-200 font-bold hover:border-b"
              >Quiz</router-link
            >
          </li><li>
            <a href="http://team.tisini.co.ke/live/" class="text-white hover:text-gray-200 font-bold hover:border-b" target="_blank"
              >Live score</a
            >
          </li>
        </ul>
        <div v-if="!isAuthenticated">
          <router-link
            :to="{ name: 'login' }"
            class="bg-white px-4 py-2 rounded"
            >Login</router-link
          >
        </div>
        <div v-else>
          <router-link
            :to="{ name: 'logout' }"
            class="bg-white px-4 py-2 rounded"
            >Logout</router-link
          >
        </div>
      </div>
    </div>
  </header>
</template>
