import {
  OrganizationInterface,
  RequestFunction,
  SubmitQuizPayload,
} from "@/types";
import tisiniRequestHandler from "./handler";

export const getTisiniOrganizations: RequestFunction<
  OrganizationInterface[],
  any
> = async function (cb?: (data: OrganizationInterface[], err: any) => void) {
  return await tisiniRequestHandler<OrganizationInterface[], Error>(
    {
      method: "GET",
      url: "/quiz/organizations/",
      callback: cb,
    },
    {
      type: "protected",
    }
  );
};
export const submitTisiniQuiz = async function (
  qsetId: string,
  data: SubmitQuizPayload,
  cb?: (data: any, err: any) => void
) {
  return await tisiniRequestHandler<any, any>(
    {
      method: "POST",
      url: `/quiz/question_sets/${qsetId}/leaderboard/`,
      data: data as any,
      callback: cb,
    },
    {
      type: "protected",
    }
  );
};

export const getQuestionSetLeaderBoards = async function (
  cb?: (data: any, err: any) => void
) {
  return await tisiniRequestHandler<any, any>(
    {
      method: "GET",
      url: `/quiz/question_sets/`,
      callback: cb,
    },
    {
      type: "protected",
    }
  );
};
