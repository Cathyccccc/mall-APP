<template>
  <van-tabbar route fixed>
    <van-tabbar-item icon="home-o" to="/home">主页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/home/classify">分类</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/home/cart"
      :badge="badge" id="shop-car">购物车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      counterItem: (state) => state.counterItem,
    }),
    badge() {
      const count = Object.values(this.counterItem).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
};
</script>

<style scoped lang="less">
</style>
