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
class QsetStatus {
  private static instance: QsetStatus;
  private constructor() {}

  public static getInstance(): QsetStatus {
    if (!QsetStatus.instance) {
      QsetStatus.instance = new QsetStatus();
    }

    return QsetStatus.instance;
  }
  private badgeColors: Record<QuizSetStatus, BadgeColors> = {
    "not-started":
      "bg-blue-100 text-blue-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
    "in-progress":
      "bg-green-100 text-green-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
    closed:
      "bg-red-100 text-red-800 border px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
  };

  public getStatus = (quizSetPicked: QuizSetPickedType): QuizSetStatus => {
    const { end_time, start_time, status, play_date } = quizSetPicked;
    const startDateTime = moment(play_date + " " + start_time);
    const endDateTime = moment(play_date + " " + end_time);
    const currentDateTime = moment();

    if (status === "PL" || currentDateTime.isBefore(startDateTime)) {
      return "not-started";
    }

    if (currentDateTime.isBetween(startDateTime, endDateTime)) {
      return "in-progress";
    }

    if (currentDateTime.isAfter(endDateTime)) {
      return "closed";
    }

    return "not-started";
  };

  public getStartDate = (quizSetPicked: QuizSetPickedType): Date => {
    const { start_time, play_date } = quizSetPicked;
    const startDateTime = moment(play_date + " " + start_time);

    return startDateTime.toDate();
  };

  public getEndDate = (quizSetPicked: QuizSetPickedType): Date => {
    const { end_time, play_date } = quizSetPicked;
    const endDateTime = moment(play_date + " " + end_time);

    return endDateTime.toDate();
  };

  public getBadgeColor = (quizSetPicked: QuizSetPickedType): BadgeColors => {
    const status = this.getStatus(quizSetPicked);
    return this.badgeColors[status];
  };

  public getPriority = (quizSetPicked: QuizSetPickedType): priorityType => {
    const status = this.getStatus(quizSetPicked);

    switch (status) {
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
}
export default QsetStatus;
const QsetStatusInstance = QsetStatus.getInstance();
export { QsetStatus, QsetStatusInstance as qSetStatus };
