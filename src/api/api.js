import axios from './axios';
import URLs from './URLs';

const getSideBar = (type) => axios.get(URLs.getSideBar, {
  params: {
    type,
  },
});

const getGoodsList = (type, page, size, sort) => axios.get(URLs.getGoodsList, {
  params: {
    type,
    page,
    size,
    sort,
  },
});

const likeSearch = (likeValue) => axios.get(URLs.likeSearch, {
  params: {
    likeValue,
  },
});

const search = (params) => axios.get(URLs.search, { params });

const getGoodsByIds = (value) => axios.get(URLs.getGoodsByIds, {
  params: {
    value,
  },
});

export default {
  getSideBar,
  getGoodsList,
  likeSearch,
  search,
  getGoodsByIds,
};
