import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userRole: "",
  },
  mutations: {
    SET_USER_ROLE: (state, userRole) => {
      state.userRole = userRole
    },
  },
  actions: {
    CHANGE_USER_ROLE({commit}, res) {
      commit('SET_USER_ROLE', res);
    },
  },
  getters: {
    USER_ROLE(state){
      return state.userRole
    },
  }
})
