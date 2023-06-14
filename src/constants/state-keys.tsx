import { APP_NAME } from "./app-name";

const prefix = APP_NAME;
type AppStates = "tisini-app-authState" | "tisini-app-quizState";

export const stateKeys: Record<AppStates, string> = {
  "tisini-app-authState": `${prefix}-authState`,
  "tisini-app-quizState": `${prefix}-quizState`,
};
