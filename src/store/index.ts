import { createStore } from 'vuex'
import router from "@/router";
import {User, State} from "@/types";
import createPersistedState from "@/plugins/vuexPersist";

const state: State = {
  token: '',
  user: null
};

export default createStore<State>({
  state,
  getters: {
  },
  mutations: {
    setToken: (state, token: string) => {
      state.token = token;
    },
    setUser: (state, user: User) => {
      state.user = user;
    }
  },
  actions: {
    async login({ commit , state}, payload) {

      const response = await fetch('http://localhost:8080/api/v1/auth', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseText = await response.text();
      const responseObject = JSON.parse(responseText);
      commit('setToken', responseObject.token);
      commit('setUser', responseObject.user);


      if (state.user === null){
        throw new Error();
      }

      if (state.user.userRole === "ADMIN"){
       await router.push("/hospital/dashboard");
      }

      if (state.user.userRole === "CUSTOMER"){
        await router.push("/customer/dashboard");
      }

      if (state.user.userRole === "WORKER"){
        await router.push("/doctor/dashboard");
      }


    },
    async logout({commit}){
        commit('setToken', '');
        commit('setUser', null);
        localStorage.removeItem('vuex');
    },
    async setUser({ commit, state }, user) {
      const response = await fetch("http://localhost:8080/api/v1/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${state.token}`
        },
        body: JSON.stringify(user),
      })

      const responseText = await response.text();
      const responseObject = JSON.parse(responseText);
      console.log(responseObject);


      commit('setUser', responseObject);
    }
  },
  plugins: [createPersistedState()]
})
