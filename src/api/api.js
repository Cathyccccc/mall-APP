import axios from './axios';
import URLs from './URLs';

const getSideBar = (type) => axios.get(URLs.getSideBar, { type });

const getGoodsList = (params) => axios.get(URLs.getGoodsList, { params });

const likeSearch = (likeValue) => axios.get(URLs.likeSearch, { likeValue });

const search = (params) => axios.get(URLs.search, { params });

const getGoodsByIds = (value) => axios.get(URLs.getGoodsByIds, { value });

export default {
  getSideBar,
  getGoodsList,
  likeSearch,
  search,
  getGoodsByIds,
};
