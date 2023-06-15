import type { QuestionSetInterface } from "@/types";
import moment from "moment";

type QuizSetStatus = "not-started" | "in-progress" | "closed";

type QuizSetPickedType = Pick<
  QuestionSetInterface,
  "end_time" | "start_time" | "status" | "play_date"
>;

type BadgeColors =
  | "bg-green-100 text-green-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
  | "bg-red-100 text-red-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
  | "bg-blue-100 text-blue-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full";

const badgeColors: Record<QuizSetStatus, BadgeColors> = {
  "not-started":
    "bg-blue-100 text-blue-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
  "in-progress":
    "bg-green-100 text-green-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
  closed:
    "bg-red-100 text-red-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
};
type priorityType = 1 | 2 | 3;
const getBadgeColor = (quizSetStatus: QuizSetStatus) => {
  return badgeColors[quizSetStatus];
};

const getPriority = (quizSetStatus: QuizSetStatus): priorityType => {
  switch (quizSetStatus) {
    case "not-started":
      return 2;
    case "in-progress":
      return 1;
    case "closed":
      return 3;
    default:
      return 3;
  }
};

type CombinedQuizSetPickedType = {
  quizSetStatus: QuizSetStatus;
  startDateTime: Date;
  endDateTime: Date;
  badgeColor: BadgeColors;
  priority: priorityType;
};

type ModifierFunctioType = (
  quizSetPicked: QuizSetPickedType
) => CombinedQuizSetPickedType;

const quizSetTimeStatus: ModifierFunctioType = (
  quizSetPicked: QuizSetPickedType
) => {
  const { end_time, start_time, status, play_date } = quizSetPicked;
  const startDateTime = moment(play_date + " " + start_time);
  const endDateTime = moment(play_date + " " + end_time);
  const currentDateTime = moment();
  if (status === "PL") {
    return {
      quizSetStatus: "not-started",
      startDateTime: startDateTime.toDate(),
      endDateTime: endDateTime.toDate(),
      badgeColor: getBadgeColor("not-started"),
      priority: getPriority("not-started"),
    };
  } else {
    if (currentDateTime.isBefore(startDateTime)) {
      return {
        quizSetStatus: "not-started",
        startDateTime: startDateTime.toDate(),
        endDateTime: endDateTime.toDate(),
        badgeColor: getBadgeColor("not-started"),
        priority: getPriority("not-started"),
      };
    }
    if (currentDateTime.isBetween(startDateTime, endDateTime)) {
      return {
        quizSetStatus: "in-progress",
        startDateTime: startDateTime.toDate(),
        endDateTime: endDateTime.toDate(),
        badgeColor: getBadgeColor("in-progress"),
        priority: getPriority("in-progress"),
      };
    }
    if (currentDateTime.isAfter(endDateTime)) {
      return {
        quizSetStatus: "closed",
        startDateTime: startDateTime.toDate(),
        endDateTime: endDateTime.toDate(),
        badgeColor: getBadgeColor("closed"),
        priority: getPriority("closed"),
      };
    }
  }
  return {
    quizSetStatus: "not-started",
    startDateTime: startDateTime.toDate(),
    endDateTime: endDateTime.toDate(),
    badgeColor: getBadgeColor("not-started"),
    priority: getPriority("not-started"),
  };
};

export { quizSetTimeStatus };
