import { TisiniRouteMetaInterface } from "@/types";
import { RouteRecordRaw } from "vue-router";

const quizRouter: RouteRecordRaw = {
  path: "/quiz",
  name: "quizes",
  component: () =>
    import(
      /* webpackChunkName: "quizes-base-wrapper" */ "@/layouts/BaseLayout.vue"
    ),
  children: [
    {
      path: "organizations",
      name: "organization-quiz",
      component: () =>
        import(/* webpackChunkName: "quiz-orgs" */ "@/components/QuizOrgs.vue"),
    },
    /**
     * Quizset
     */
    {
      path: "organizations/:qsetId/quizsets",
      name: "organization-quizsets",
      meta: {
        requiresAuth: true,
        title: "Quiz set page",
        roles: [],
      } satisfies TisiniRouteMetaInterface,
      component: () =>
        import(
          /* webpackChunkName: "organization-quizsets" */ "@/components/OrgQuizSets.vue"
        ),
    },
    /**
     * Play Quiz
     * */
    {
      path: "organizations/:orgId/quizsets/:qsetId/play",
      name: "play-quiz",
      meta: {
        requiresAuth: true,
        title: "Play Quiz",
        roles: [],
      } satisfies TisiniRouteMetaInterface,
      component: () =>
        import(/* webpackChunkName: "play-quiz" */ "@/components/PlayQuiz.vue"),
    },
    /**
     * Completed Quiz
     * */
    {
      path: "organizations/:orgId/quizsets/:qsetId/completed",
      name: "completed-quiz",
      meta: {
        requiresAuth: true,
        title: "Completed Quiz",
        roles: [],
      } satisfies TisiniRouteMetaInterface,
      component: () =>
        import(
          /* webpackChunkName: "completed-quiz" */ "@/components/CompletedQuiz.vue"
        ),
    },
    /**
     * Quizset leaderboard
     * */
    {
      path: "organizations/quizsets/:qsetId/leaderboard",
      name: "quizset-leaderboard",
      meta: {
        requiresAuth: true,
        title: "Quizset Leaderboard",
        roles: [],
      } satisfies TisiniRouteMetaInterface,
      component: () =>
        import(
          /* webpackChunkName: "quizset-leaderboard" */ "@/components/QuizSetLeaderboard.vue"
        ),
    },
  ],
};

export default quizRouter;
