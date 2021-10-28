import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    goodsList: [],
    showContent: false,
    size: 5,
  },
  mutations: {
    changeSideList(state, payload) {
      state.sideList = payload;
    },
    changeGoodsList(state, payload) {
      state.goodsList = payload;
    },
    changeShowContent(state) {
      state.showContent = !state.showContent;
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      const res = await api.getSideBar(type);
      commit('changeSideList', res);
      commit('changeShowContent');
    },
    async getGoodsList({ state, commit }, options) {
      const { type, page, sort } = options;
      const res = await api.getGoodsList(type, page, state.size, sort);
      console.log(res);
      commit('changeGoodsList', res.list);
    },
  },
  modules: {
  },
});
