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
  const {...rest} = data.question_players;
  return await tisiniRequestHandler<any, any>(
    {
      method: "POST",
      url: `/quiz/quiz_leaderboard/${qsetId}/leaderboard/`,
      data: rest as any,
      callback: cb,
    },
    {
      type: "protected",
    }
  );
};

export const getQuestionSetLeaderBoards = async function (
  qsetId: string,
  cb?: (data: any, err: any) => void
) {
  return await tisiniRequestHandler<any, any>(
    {
      method: "GET",
      url: `/quiz/quiz_leaderboard/${qsetId}`,
      callback: cb,
    },
    {
      type: "protected",
    }
  );
};

export const getSingleOrganizationQuestionSets = async function (
  orgId: string,
  cb?: (data: any, err: any) => void
) {
  return await tisiniRequestHandler<any, any>(
    {
      method: "GET",
      url: `/quiz/organizations/${orgId}`,
      callback: cb,
    },
    {
      type: "protected",
    }
  );
}