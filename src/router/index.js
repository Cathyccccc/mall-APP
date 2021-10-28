import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Classify from '@/views/Classify.vue';
import Cart from '@/views/Cart.vue';
// import Search from '@/components/search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: Home,
    name: 'home',
    children: [
      {
        path: 'classify',
        component: Classify,
        name: 'classify',
      },
      {
        path: 'cart',
        component: Cart,
        name: 'cart',
      },
    ],
  },
  {
    path: '*',
    redirect: '/home',
  },
  // {
  //   path: '/search',
  //   component: Search,
  //   name: 'search',
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
