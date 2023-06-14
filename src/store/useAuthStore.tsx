import { AuthStateInterface, UserInterface } from "@/types";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { Router } from "vue-router";
import { defineStore } from "pinia";
import { stateKeys } from "@/constants/state-keys";
import { removeToken } from "@/services/cookieService";

// const initialState: AuthStateInterface = JSON.parse(
//   localStorage.getItem(stateKeys["tisini-app-authState"])!
// )
//   ? JSON.parse(localStorage.getItem(stateKeys["tisini-app-authState"])!)
//   : ({
//       user: null,
//       loading: false,
//       refreshToken: "",
//       isAuthenticated: false,
//     } as unknown as AuthStateInterface);

export interface AuthStateInterfaceWithRouter extends AuthStateInterface {
  router: Router;
}

export const useAuthStore = defineStore({
  id: "authState",
  state: (): AuthStateInterface =>
    localStorage.getItem(stateKeys["tisini-app-authState"])
      ? JSON.parse(
          localStorage.getItem(stateKeys["tisini-app-authState"]) as string
        )
      : {
          loading: false,
          user: null,
          authenticated: false,
          refreshToken: null,
          accessToken: null,
        },
  getters: {
    isAuthStateLoading: (state: AuthStateInterface) => state.loading,
    authStateUser: (state: AuthStateInterface) => state.user,
    isAuthenticated: (state: AuthStateInterface) => state.authenticated,
    getRefreshToken: (state: AuthStateInterface) => state.refreshToken,
    getAccessToken: (state: AuthStateInterface) => state.accessToken,
    isRefreshTokenValid: (state: AuthStateInterface) => {
      const tokenDecoded = jwtDecode(
        state.refreshToken as string
      ) as JwtPayload;
      const currentTime = new Date().getTime() / 1000;
      return tokenDecoded.exp! > currentTime;
    },
  },
  actions: {
    async loginUser(payload: AuthStateInterface) {
      this.loading = false;
      this.user = payload.user;
      this.refreshToken = payload.refreshToken;
      this.accessToken = payload.accessToken;
      this.authenticated = true;
      localStorage.setItem(
        stateKeys["tisini-app-authState"],
        JSON.stringify(this.$state)
      );
    },
    updateTokens({
      accessToken,
      refreshToken,
    }: {
      refreshToken: string;
      accessToken: string;
    }) {
      this.refreshToken = refreshToken;
      this.accessToken = accessToken;
      localStorage.setItem(
        stateKeys["tisini-app-authState"],
        JSON.stringify(this.$state)
      );
    },
    updateUser(user: UserInterface) {
      this.user = user;
      localStorage.setItem(
        stateKeys["tisini-app-authState"],
        JSON.stringify(this.$state)
      );
    },
    async logoutUser() {
      removeToken("ts-ka-369340a21d88d03d9509");
      this.user = null;
      this.refreshToken = null;
      this.accessToken = null;
      this.authenticated = false;
      localStorage.removeItem(stateKeys["tisini-app-authState"]);
    },
  },
});
