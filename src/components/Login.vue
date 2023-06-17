<script setup lang="ts">
import {
  LoginUserResponseInterface,
  SignInUserInterface,
  LoginTokenInterface,
} from "@/types";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "vue-toast-notification";
import { required, minLength, helpers, email } from "@vuelidate/validators";
import { AxiosError } from "axios";
import { ref } from "vue";
import { loginUserRequest } from "@/api/requests/auth-requests";
import { setCookieToken } from "@/services/cookieService";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const isLoading = ref<boolean>(false);
const nextRoute = router.currentRoute.value.query._redirect
  ? (router.currentRoute.value.query._redirect as string)
  : null;
const loginRules = {
  email: {
    required: helpers.withMessage("Email is required", required),
    email,
  },
  password: {
    required: helpers.withMessage("Password required", required),
    minLength: helpers.withMessage(
      "Password must be at least 6 characters",
      minLength(6)
    ),
  },
};

const formData = ref<SignInUserInterface>({
  email: "",
  password: "",
});
const $v = useVuelidate(loginRules, formData.value);

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if ($v.value.$invalid) {
    $v.value.$validate();
    toast.error("Please fill in all the fields", {
      position: "top-right",
      duration: 5000,
      pauseOnHover: true,
      type: "error",
    });
  } else {
    console.time("login");
    isLoading.value = true;
    loginUserRequest(
      formData.value,
      async (data: LoginUserResponseInterface, err: any) => {
        if (err instanceof AxiosError) {
          // console.log({ err: err.response?.data });

          toast.error(err.response?.data.detail, {
            position: "top-right",
            duration: 5000,
            pauseOnHover: true,
            type: "error",
          });
        } else {
          // console.log({ data });
          const { tokens, ...profile } = data;
          const { access, refresh } = JSON.parse(tokens) as LoginTokenInterface;
          // console.log({ access, refresh, profile });

          setCookieToken({
            accessToken: access,
            refreshToken: refresh,
          });
          authStore.loginUser({
            accessToken: access,
            user: profile,
            authenticated: true,
            loading: false,
            refreshToken: null,
          });

          setCookieToken({ accessToken: access, refreshToken: refresh });
          authStore.loginUser({
            refreshToken: refresh,
            accessToken: access,
            user: profile,
            authenticated: true,
            loading: false,
          });
        }
        isLoading.value = false;
        console.timeEnd("login");
        !err && (await router.push(nextRoute?nextRoute:"/"));
      }
    );
  }
};
</script>

<template>
  <main
    class="min-h-screen bg-no-repeat bg-cover bg-center bg-blend-overlay flex flex-col justify-center items-center">
    <!-- component -->
    <!-- Container -->
    <div
      class="flex flex-wrap min-h-screen w-full content-center justify-center py-10">
      <!-- Login component -->
      <div
        class="flex shadow-md w-full max-w-lg mx-4 bg-white rounded p-4 border">
        <!-- Login form -->
        <div
          class="flex w-full flex-wrap content-center justify-center md:p-10 rounded-l-md bg-white">
          <div class="p-4 w-full">
            <!-- Heading -->
            <div class="p-4 text-center">
              <h1 class="text-xl font-semibold">Login to account</h1>
              <small class="text-gray-700">
                Enter your details to create your account
              </small>
            </div>

            <!-- Form -->
            <form @submit="handleSubmit" class="mt-4 w-full">
              <div class="mb-3">
                <label class="mb-2 block text-xs font-semibold"
                  >Email address</label
                >
                <input
                  type="email"
                  v-model="formData.email"
                  placeholder="Enter your email address"
                  autocomplete="email"
                  class="block w-full rounded-md border border-gray-300 focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700 py-1 px-1.5 text-gray-500" />
                <p v-if="$v.email.$error" class="text-sm text-red-400">
                  <span v-for="err in $v.email.$errors" class="">{{
                    err.$message
                  }}</span>
                </p>
              </div>

              <div class="mb-3">
                <label class="mb-2 block text-xs font-semibold">Password</label>
                <div>
                  <input
                    type="password"
                    v-model="formData.password"
                    placeholder="*****"
                    autocomplete="current-password"
                    class="block w-full rounded-md border border-gray-300 focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700 py-1 px-1.5 text-gray-500" />
                </div>
                <p v-if="$v.password.$error" class="text-sm text-red-400">
                  <span v-for="err in $v.password.$errors" class="">{{
                    err.$message
                  }}</span>
                </p>
              </div>

              <!-- <div class="mb-3 flex flex-wrap content-center justify-end">
                <router-link
                  :to="{ name: 'forgotPassword' }"
                  class="text-xs font-semibold text-primary-700"
                  >Forgot password?</router-link
                >
              </div> -->

              <div class="mb-3">
                <button
                  :disabled="isLoading"
                  :class="[{ 'opacity-50 cursor-not-allowed': isLoading }]"
                  type="submit"
                  class="mb-1.5 block w-full text-center text-white bg-primary hover:bg-bg-primary-700 px-2 py-1.5 rounded-md">
                  <span
                    v-if="isLoading"
                    class="flex items-center justify-center gap-2">
                    <svg
                      class="animate-spin -ml-1 mr-1 h-4 w-4"
                      viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-2.009a5.995 5.995 0 01-2-10.69L4.701 6.7z"></path>
                    </svg>
                    <span> Loading </span>
                  </span>
                  <span
                    v-else="!isLoading"
                    class="flex items-center flex-row-reverse justify-center gap-2">
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                    Sign in
                  </span>
                </button>
                <!-- <button
                  class="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md"
                >
                  <img
                    class="w-5 mr-2"
                    src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                  />
                  Sign in with Google
                </button> -->
              </div>
            </form>

            <!-- Footer -->
            <div class="text-center">
              <span class="text-xs text-gray-700 font-semibold"
                >Don't have account?</span
              >
              <router-link
                :to="{ name: 'register',query:{_redirect:nextRoute?nextRoute:'_none'} }"
                class="text-xs ml-1 font-semibold text-primary-700"
                >Sign up</router-link
              >
            </div>
          </div>
        </div>

        <!-- Login banner -->
        <!-- <div
          class="hidden lg:flex flex-wrap content-center justify-center rounded-r-md lg:w-1/2 h-full bg-center bg-no-repeat bg-cover"
          style="
            background-image: url('https://img.freepik.com/premium-photo/flock-white-geese-dirt-farm-road_198639-18867.jpg?w=740');
          "
        ></div> -->
      </div>

      <!-- Credit -->
      <!-- <div class="mt-3 w-full">
        <p class="text-center">
          Made by
          <a
            target="_blank"
            href="https://github.com/forinda"
            class="text-primary-700"
            >Felix Orinda @{{ new Date().getFullYear() }}</a
          >
        </p>
      </div> -->
    </div>
  </main>
</template>

<style scoped>
/* code */
</style>
