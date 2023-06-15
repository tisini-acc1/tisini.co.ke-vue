<script setup lang="ts">
import { PropType, computed, ref, watchEffect } from "vue";
import moment from "moment";
import { QuestionSetInterface } from "@/types";
import combineDateAndTime from "@/utils/combineDateAndTime";
import { qSetStatus } from "@/utils/QsetStatus";
// Props
const { qset, orgId } = defineProps({
  qset: {
    type: Object as PropType<QuestionSetInterface>,
    required: true,
  },
  orgId: {
    type: String,
    required: true,
  },
});
// Variables to be used in the template
// This will hold the target time to countdown to
const targetTime = ref(moment());

// Set the target time to some date and time
targetTime.value = combineDateAndTime(qset.play_date, qset.start_time);

// This will hold the remaining time to the target time
const remainingTime = ref(moment.duration(targetTime.value.diff(moment())));

// Update remainingTime every second
setInterval(() => {
  remainingTime.value = moment.duration(targetTime.value.diff(moment()));
}, 1000);

// Print remaining time whenever it changes
watchEffect(() => {
  // console.log(`Remaining time: ${remainingTime.value.asSeconds()} seconds`);
});
// Get time status and time left in hrs, mins and secs
type TimeLeft = {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
};


const progressTime = (type: "start" | "end"): TimeLeft => {
  //   const endTime = combineDateAndTime(combineDateAndTime(qset.play_date,qset.start_time),combineDateAndTime(qset.play_date,qset.end_time));
  const startTime = moment(qSetStatus.getStartDate(qset));
  const endTime = moment(qSetStatus.getEndDate(qset));
  const rt = moment.duration(
    type === "start" ? startTime.diff(moment()) : endTime.diff(moment())
  );
  // const rt = moment.duration(startTime.diff(moment()));
  const hrs = computed(() => {
    return Math.abs(rt.hours()) < 10
      ? String(Math.floor(Math.abs(rt.hours()))).padStart(2, "0")
      : Math.floor(Math.abs(rt.hours())).toFixed(0);
  });
  const mins = computed(() => {
    return Math.abs(rt.minutes()) < 10
      ? String(Math.abs(rt.minutes())).padStart(2, "0")
      : Math.abs(rt.minutes()).toFixed(0);
  });
  const secs = computed(() => {
    return Math.abs(rt.seconds()) < 10
      ? String(Math.abs(rt.seconds())).padStart(2, "0")
      : Math.abs(rt.seconds()).toFixed(0);
  });
  const timeLeft = {
    hours: hrs.value,
    minutes: mins.value,
    seconds: secs.value,
  };

  if (remainingTime.value.asSeconds() < 0) {
    return  timeLeft
  
  }
  if (remainingTime.value.asSeconds() > 0) {
    return timeLeft

  }
  return timeLeft
  
};

</script>

<template>
  <li class="flex flex-col gap-1">
    <div class="flex justify-between border-b py-2">
      <h1 class="font-bold">{{ qset.category_name }}</h1>
      <!-- Badge -->
      <div>
        <span
          v-if="qSetStatus.getStatus(qset) === 'not-started'"
          :class="[qSetStatus.getBadgeColor(qset)]"
        >
          Not started
        </span>
        <span
          v-if="qSetStatus.getStatus(qset) === 'in-progress'"
          :class="[qSetStatus.getBadgeColor(qset)]"
        >
          In progress
        </span>
        <span
          v-if="qSetStatus.getStatus(qset) === 'closed'"
          :class="[qSetStatus.getBadgeColor(qset)]"
        >
          Closed
        </span>
      </div>
    </div>
    <div
      v-if="qSetStatus.getStatus(qset) === 'not-started'"
      class="flex flex-col gap-1"
    >
      <div></div>
      <p class="text-center">
        <span class=""> Will open in</span>
        <h1 class="tracking-wider font-mono font-bold text-lg">
          {{ progressTime("start").hours }}:{{
          progressTime("start").minutes
        }}:{{ progressTime("start").seconds }}
        </h1>
       
      </p>
    </div>
    <div
      v-if="qSetStatus.getStatus(qset) === 'in-progress'"
      class="flex flex-col gap-1"
    >
    <p class="text-center">
      <span class=""> Will close in</span>
      <h1 class="tracking-wider font-mono font-bold text-lg">
        {{ progressTime("end").hours }}:{{
          progressTime("end").minutes
        }}:{{ progressTime("end").seconds }}
        </h1>
        
      </p>
      <div>
        <router-link
          type="button"
          class="text-white bg-green-800 font-medium uppercase w-full text-center px-2 py-1 rounded border"
          :to="{name:'organization-quizsets', query:{queryCategory:qset.category_name, orgId:orgId, qStatus:qSetStatus.getStatus(qset)}, params:{qsetId:qset.uid}}"
        >
          Start Quiz
        </router-link>
      </div>
      
    </div>
    <div
      v-if="qSetStatus.getStatus(qset) === 'closed'"
      class="flex flex-col gap-1"
    >
      <h1 class="text-red-500 font-bold text-center py-4 uppercase">Quiz Closed</h1>
    </div>
  </li>
</template>
