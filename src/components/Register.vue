<script setup lang="ts">
import { RegisterUserResponseInterface, SignupUserInterface } from "@/types";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "vue-toast-notification";
import { required, minLength, helpers, maxLength } from "@vuelidate/validators";
import { TisiniValidator } from "@/utils/tisiniValidator";
import { ref } from "vue";
// import { useRouter } from "vue-router";
import { registerUserRequest } from "@/api/requests/auth-requests";
import { useRouter } from "vue-router";
// import { countries } from "@/data/countries";

// const availableCountries = ref(countries);
const router = useRouter();
const nextRoute = router.currentRoute.value.query._redirect
  ? (router.currentRoute.value.query._redirect as string)
  : null;
const toast = useToast();
const isLoading = ref<boolean>(false);
// type SignUpStep = "personal" | "account";
const rules = {
  first_name: {
    required: helpers.withMessage("First name is required", required),
  },
  last_name: {
    required: helpers.withMessage("Last name is required", required),
  },
  username: {
    required: helpers.withMessage("Username is required", required),
    minLength: helpers.withMessage(
      "Username must be at least 3 characters",
      minLength(3)
    ),
  },
  email: {
    // required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Email is invalid", required),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
    minLength: helpers.withMessage(
      "Password must be at least 6 characters",
      minLength(6)
    ),
    // lowercase: helpers.withMessage(
    //   "Password must contain at least one lowercase letter",
    //   TisiniValidator.passwordLowercase
    // ),
    // uppercase: helpers.withMessage(
    //   "Password must contain at least one uppercase letter",
    //   TisiniValidator.passwordUppercase
    // ),
    // number: helpers.withMessage(
    //   "Password must contain at least one number",
    //   TisiniValidator.passwordNumbers
    // ),
    // special: helpers.withMessage(
    //   "Password must contain at least one special character (e.g. !@#$%^&*)",
    //   TisiniValidator.passwordSpecialCharacters
    // ),
  },
  phone_number: {
    required: helpers.withMessage("Phone number is required", required),
    minLength: helpers.withMessage(
      "Phone number must be at least 13 characters",
      minLength(13)
    ),
    maxLength: helpers.withMessage(
      "Phone number must be at least 13 characters",
      maxLength(13)
    ),
    phone: helpers.withMessage(
      "Phone number must be in the format +254 000 000 0000",
      TisiniValidator.validPhone
    ),
  },
};

// const signUpStep = ref<SignUpStep>("personal");

const formData = ref<SignupUserInterface>({
  username: "",
  password: "",
  email: "",
  last_name: "",
  first_name: "",
  phone_number: "+254",
  is_author: false,
  is_quiz_admin: false,
});

const showPassword = ref<boolean>(false);
const $v = useVuelidate(rules, formData.value);

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
    // try {
    //   isLoading.value = true;
    //   await publicAuriginAfricaRequest.post("/auth/register/", formData.value);

    //   toast.success("Account created successfully", {
    //     position: "top-right",
    //     duration: 10000,
    //     pauseOnHover: true,
    //     type: "success",
    //   });
    //   setTimeout(async () => {
    //     await router.push({ name: "login" });
    //   }, 2000);
    // } catch (error: any) {
    //   if (error instanceof AxiosError) {
    //     const { detail } = error.response!.data as any;
    //     let msg = "";
    //     // if (Array.isArray(errors)) {
    //     //   errors.forEach((err: any) => {
    //     //     msg += err !== "" ? err + " " : "";
    //     //   });
    //     // }
    //     toast.error(detail, {
    //       position: "top-right",
    //       duration: 5000,
    //       pauseOnHover: true,
    //       type: "error",
    //     });
    //   }
    // } finally {
    //   isLoading.value = false;
    // }
    isLoading.value = true;
    console.time("register");
    registerUserRequest(
      formData.value,
      (data: RegisterUserResponseInterface, error: any) => {
        if (error) {
          const messages = Object.values(error.response.data).flatMap(
            (x: any) => x
          );
          const er = messages.join(" ");

          toast.error(er, {
            position: "top-right",
            duration: 5000,
            pauseOnHover: true,
            type: "error",
          });
        } else {
          toast.success("Account created successfully", {
            position: "top-right",
            duration: 10000,
            pauseOnHover: true,
            type: "success",
          });
          console.log(data);

          // setTimeout(async () => {
          //   await router.push({ name: "login" });
          // }, 2000);
        }
        isLoading.value = false;
        console.timeEnd("register");
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
      class="flex flex-wrap min-h-screen w-full content-center justify-center py-10 px-4">
      <!-- Register component -->
      <div class="flex shadow-md bg-white rounded w-full md:max-w-xl">
        <!-- Register form -->
        <div
          class="flex w-full flex-wrap content-center justify-center rounded-l-md bg-white bg-opacity-80 p-4 rounded border">
          <div class="p-4 w-full">
            <!-- Heading -->
            <div class="p-4 text-center">
              <h1 class="text-xl font-semibold">Create new account</h1>
              <small class="text-gray-700">
                Enter your details to create your account
              </small>
            </div>

            <!-- Form -->
            <form @submit="handleSubmit" class="mt-4">
              <!-- Part 1 -->
              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name">
                  First Name
                </label>
                <input
                  v-model="formData.first_name"
                  class="input"
                  id="grid-first-name"
                  type="text"
                  placeholder="First name"
                  autocomplete="given-name"
                  aria-autocomplete="both" />
                <p class="error">
                  <span v-for="err in $v.first_name.$errors">{{
                    err.$message
                  }}</span>
                </p>
              </div>
              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name">
                  Last Name
                </label>
                <input
                  v-model="formData.last_name"
                  class="input"
                  id="grid-last-name"
                  type="text"
                  placeholder="Last name"
                  autocomplete="family-name"
                  aria-autocomplete="list" />
                <ul class="error">
                  <li v-for="err in $v.last_name.$errors">
                    {{ err.$message }}
                  </li>
                </ul>
              </div>
              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name">
                  Username
                </label>
                <input
                  v-model="formData.username"
                  class="input"
                  id="grid-username"
                  type="text"
                  placeholder="Username"
                  autocomplete="username"
                  aria-autocomplete="both" />
                <ul class="error">
                  <li v-for="err in $v.username.$errors">
                    {{ err.$message }}
                  </li>
                </ul>
              </div>
              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name">
                  Phone Number
                </label>
                <input
                  v-model="formData.phone_number"
                  class="input"
                  id="grid-username"
                  type="text"
                  placeholder="+254 000 000 0000"
                  autocomplete="tel"
                  maxlength="13"
                  minlength="13"
                  aria-autocomplete="both" />
                <ul class="error">
                  <li v-for="err in $v.phone_number.$errors">
                    {{ err.$message }}
                  </li>
                </ul>
              </div>
              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name">
                  Email
                </label>
                <input
                  v-model="formData.email"
                  class="input"
                  id="grid-email"
                  type="text"
                  placeholder="example@gmail.com"
                  autocomplete="email" />
                <ul class="error">
                  <li v-for="err in $v.email.$errors">
                    {{ err.$message }}
                  </li>
                </ul>
              </div>

              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name">
                  Password
                </label>
                <input
                  v-model="formData.password"
                  class="input"
                  id="grid-password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="********"
                  autocomplete="new-password"
                  aria-autocomplete="list" />
                <ul class="error">
                  <li v-for="err in $v.password.$errors">
                    {{ err.$message }}
                  </li>
                </ul>
              </div>
              <div
                class="w-full flex flex-row-reverse items-center justify-end gap-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name">
                  Show Password
                </label>
                <input
                  v-model="showPassword"
                  id="grid-password-show"
                  type="checkbox" />
              </div>

              <div class="my-3 flex items-center gap-2">
                <button
                  :disabled="isLoading"
                  :class="[{ 'opacity-50 cursor-not-allowed': isLoading }]"
                  type="submit"
                  class="w-full block text-center text-white bg-primary hover:bg-bg-primary px-2 py-1.5 rounded-md">
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
                    Create Account
                  </span>
                </button>
              </div>
            </form>

            <!-- Footer -->
            <div class="text-center">
              <span class="text-xs text-gray-700 font-semibold"
                >Already have account?</span
              >
              <router-link
                :to="{ name: 'login',query:{_redirect:nextRoute} }"
                class="text-xs ml-1 font-semibold text-primary-700"

                >Sign in</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* code */
.input {
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500;
}

.textarea {
  @apply appearance-none h-32 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500;
}

.select {
  @apply block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500;
}

.error {
  @apply text-red-500 text-xs italic;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: inherit !important;
  margin: initial !important;
}

.phone {
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 relative;
}

.phone::before {
  content: "+254";
  @apply absolute text-gray-500 text-sm font-semibold;
}
</style>
