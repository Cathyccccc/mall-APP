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
    goodsType: '',
    total: 1,
    counterItem: {},
    badge: 0,
  },
  mutations: {
    changeSideList(state, payload) {
      state.sideList = payload;
    },
    changeGoodsList(state, payload) {
      state.goodsList = [...state.goodsList, ...payload.list];
      state.total = payload.total;
    },
    changeShowContent(state, payload) {
      state.showContent = payload;
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    changeGoodsType(state, payload) {
      state.goodsType = payload;
    },
    setCounterItem(state, payload) {
      state.counterItem = payload;
    },
    storageChange(state, payload) {
      const { id, value } = payload;
      if (state.counterItem[id]) {
        if (value === -1 && state.counterItem[id] === 1) {
          Vue.delete(state.counterItem, id);
        } else {
          Vue.set(state.counterItem, id, state.counterItem[id] += value);
        }
      } else {
        Vue.set(state.counterItem, id, 1);
      }
      localStorage.setItem('couterItem', JSON.stringify(state.counterItem));
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      commit('changeShowContent', false);
      commit('resetGoodsList');
      const res = await api.getSideBar(type);
      // console.log(res);
      commit('changeSideList', res);
      commit('changeShowContent', true);
    },
    async getGoodsList({ state, commit }, options) {
      const { page, sort } = options;
      const type = options.type || state.goodsType;
      const res = await api.getGoodsList(type, page, state.size, sort);
      // console.log(res.list);
      commit('changeGoodsList', res);
      commit('changeGoodsType', type);
      return res;
    },
  },
  modules: {
  },
});
