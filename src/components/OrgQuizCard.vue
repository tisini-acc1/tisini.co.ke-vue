<script setup lang="ts">
import { PropType, computed, ref, watchEffect } from "vue";
import moment from "moment";
import { QuestionSetInterface } from "@/types";
import combineDateAndTime from "@/utils/combineDateAndTime";
// import router from "@/router";
// import { useRouter } from "vue-router";
type PlayStatus = "in-progress" | "yet-to-play" | "played";
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

const playStatus = ref<PlayStatus>("yet-to-play");
const getPlayStatus = (startDateTime: string, endDateTime: string) => {
  const startTime = moment(startDateTime);
  const endTime = moment(endDateTime);
  if (moment().isBetween(startTime, endTime)) {
    playStatus.value = "in-progress";
  } else if (moment().isBefore(startTime)) {
    playStatus.value = "yet-to-play";
  } else if (endTime.isAfter(moment())) {
    playStatus.value = "played";
  }
  return playStatus.value;
};

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
type timeStatus = "yet to play" | "played" | "playing";
type timeLeft = {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
};

type TimeStatusAndTimeLeft = {
  timeStatus: timeStatus;
  timeLeft: timeLeft;
};
const getTimeStatus = (): TimeStatusAndTimeLeft => {
//   const endTime = combineDateAndTime(combineDateAndTime(qset.play_date,qset.start_time),combineDateAndTime(qset.play_date,qset.end_time));
  const startTime = combineDateAndTime(qset.play_date, qset.start_time);
  const rt = moment.duration(startTime.diff(moment()));
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
    return {
      timeStatus: "played",
      timeLeft,
    };
  }
  if (remainingTime.value.asSeconds() > 0) {
    return {
      timeStatus: "yet to play",
      timeLeft,
    };
  }
  return {
    timeStatus: "playing",
    timeLeft,
  };
};

const getProgressStatus = (): timeLeft => {
  const endTime = combineDateAndTime(combineDateAndTime(qset.play_date,qset.start_time).toLocaleString(),combineDateAndTime(qset.play_date,qset.end_time).toLocaleString());
//   const startTime = combineDateAndTime(qset.play_date, qset.start_time);
  const rt = moment.duration(moment().diff(endTime));
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

  // if (remainingTime.value.asSeconds() < 0) {
  //   return {
  //     timeStatus: "played",
  //     timeLeft,
  //   };
  // }
  // if (remainingTime.value.asSeconds() > 0) {
  //   return {
  //     timeStatus: "yet to play",
  //     timeLeft,
  //   };
  // }
  return timeLeft
};
// const router = useRouter();
// const startQuiz = () => {
//   console.log("start quiz");
//   router.push(
//     `/organizations/start-quiz?queryCategory=${qset.category_name}&qsetId=${
//       qset.uid
//     }&orgId=${orgId}&qStatus=${getPlayStatus(combineDateAndTime(qset.play_date,qset.start_time),combineDateAndTime(qset.play_date,qset.end_time))}`
//   );
// };
// const startLink = computed(() => {
//   return `/organizations/quiz-set/${qset.uid}?queryCategory=${
//     qset.category_name
//   }&orgId=${orgId}&qStatus=${getPlayStatus(combineDateAndTime(qset.play_date,qset.start_time),combineDateAndTime(qset.play_date,qset.end_time))}`;
// });
</script>

<template>
  <li class="flex flex-col gap-1">
    <h2 class="font-bold">{{ qset.category_name }}</h2>
    <p class="font-medium text-blue-500">
      Play date
      {{
        moment(combineDateAndTime(qset.play_date, qset.start_time)).format("LLLL")
      }} {{getPlayStatus(combineDateAndTime(qset.play_date,qset.start_time).toString(),combineDateAndTime(qset.play_date,qset.end_time).toString())}}
    </p>

    <div>
      <p
        v-if="getPlayStatus(combineDateAndTime(qset.play_date,qset.start_time).toLocaleString(),combineDateAndTime(qset.play_date,qset.end_time).toLocaleString()) === 'in-progress'"
      >
        <span class="font-medium text-blue-500">Ends in -</span>
        {{
          `${getProgressStatus().hours}:${
            getProgressStatus().minutes
          }:${getProgressStatus().seconds}`
        }}  
    </p>
      <p
        class="font-medium text-blue-500"
        v-if="getPlayStatus(combineDateAndTime(qset.play_date,qset.start_time).toLocaleString(),combineDateAndTime(qset.play_date,qset.end_time).toLocaleString()) === 'yet-to-play'"
      >
        {{
          `${getTimeStatus().timeLeft.hours}:${
            getTimeStatus().timeLeft.minutes
          }:${getTimeStatus().timeLeft.seconds}`
        }}
        <div>
          <router-link
          type="button"
          class="text-red-400 px-2 py-1 rounded border"
          :to="{name:'organization-quizsets', query:{queryCategory:qset.category_name, orgId:orgId, qStatus:getPlayStatus(combineDateAndTime(qset.play_date,qset.start_time).toLocaleString(),combineDateAndTime(qset.play_date,qset.end_time).toLocaleString())}, params:{qsetId:qset.uid}}"
        >
          Play now
        </router-link>
        <button type="button" class="text-red-400 px-2 py-1 rounded border">
          {{
            moment(combineDateAndTime(combineDateAndTime(qset.play_date,qset.start_time).toLocaleString(),combineDateAndTime(qset.play_date,qset.end_time).toLocaleString())).fromNow()
          }}
        </button>
        </div>
      </p>
      <div
        class="font-medium text-blue-500 grid grid-cols-2 gap-2 text-sm"
        v-else-if="getPlayStatus(combineDateAndTime(qset.play_date,qset.start_time).toLocaleString(),combineDateAndTime(qset.play_date,qset.end_time).toLocaleString()) === 'in-progress'"
      >
      <router-link
          type="button"
          class="text-red-400 px-2 py-1 rounded border"
          :to="{name:'organization-quizsets', query:{queryCategory:qset.category_name, orgId:orgId, qStatus:getPlayStatus(combineDateAndTime(qset.play_date,qset.start_time).toLocaleString(),combineDateAndTime(qset.play_date,qset.end_time).toLocaleString())}, params:{qsetId:qset.uid}}"
        >
          Play now
        </router-link>
        <button type="button" class="text-red-400 px-2 py-1 rounded border">
          {{
           `${getProgressStatus().hours}:${
            getProgressStatus().minutes}`
          }}
        </button>
      </div>
      <div
        class="font-medium text-red-500"
        v-else
      >
        
        Ends
        
      </div>
    </div>
  </li>
</template>
