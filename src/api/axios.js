import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
  params: {
    appkey: 'Esther_1630650169567',
  },
});

instance.interceptors.response.use((response) => response.data);

export default instance;
