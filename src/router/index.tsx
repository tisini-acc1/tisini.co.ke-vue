import { createRouter, createWebHistory } from "vue-router";

import { TisiniRouteMetaInterface } from "@/types";
import quizRouter from "./quiz.routes";
import baseRouter from "./base.routes";
import { useAuthStore } from "@/store/useAuthStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    baseRouter,
    quizRouter,
    {
      // Match any other route
      path: "/:pathMatch(.*)*",
      name: "all-not-found",
      component: () =>
        import(
          /* webpackChunkName: "all-not-found" */ "@/components/NotFound.vue"
        ),
    },
  ],
});
/**
 * Router Guard
 */
router.beforeEach((to, _from, next) => {
  const store = useAuthStore();
  const meta = to.meta as unknown as TisiniRouteMetaInterface;

  if (store.isAuthenticated) {
    // Check if user's refresh token is valid
    if (!store.isRefreshTokenValid) {
      store.logoutUser();
      return next({ name: "login" });
    }

    //Check route name is forgot password or reset password
    if (to.name === "forgotPassword" || to.name === "resetPassword") {
      console.log("forgotPassword or resetPassword");

      if (store.isAuthenticated) {
        store.logoutUser();
        return next(to);
      } else {
        return next();
      }
    }

    // If roles are specified, check if user has the required roles
    // if (meta.requiresAuth && meta.roles) {
    //   if (meta.roles.includes(store.authStateUser!.role)) {
    //     return next();
    //   } else {
    //     return next({ name: "home" });
    //   }
    // }

    // If roles are not specified or user has the required roles, allow access to the route
    return next();
  }

  // If the user is not authenticated, redirect to login page
  if (meta.requiresAuth && to.name !== "login") {
    // check the page before login and redirect to that page after login
    return next({ name: "login", query: { _redirect: to.fullPath } });
  }

  // If the route doesn't require authentication or the user is already on the login page, allow access
  return next();
});

router.beforeResolve((_to, _from, next) => {
  next();
});

export default router;
