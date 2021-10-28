import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
  },
  mutations: {
    changeSideList(state, payload) {
      state.sideList = payload;
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      const res = await api.getSideBar(type);
      commit('changeSideList', res);
    },
  },
  modules: {
  },
});
