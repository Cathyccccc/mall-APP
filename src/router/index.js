import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Classify from '@/views/Classify.vue';
import Cart from '@/views/Cart.vue';
import Search from '@/components/Search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: Home,
    name: 'home',
    children: [
      {
        path: 'search',
        component: Search,
        name: 'search',
      },
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
];

const router = new VueRouter({
  routes,
});

export default router;
