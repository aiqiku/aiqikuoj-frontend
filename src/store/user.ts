import { StoreOptions } from "vuex";

const getters = {};

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "aiqiku",
      role: "user",
    },
  }),
  getters,
  actions: {
    getLoginUser({ commit, state }, payload) {
      commit("updateUser", { userName: "艾琪苦" });
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
