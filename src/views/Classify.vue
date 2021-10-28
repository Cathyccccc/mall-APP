<template>
  <div class="classify-container">
    <tab-one></tab-one>
    <template v-if="showContent">
      <side-bar></side-bar>
      <goods-list></goods-list>
    </template>
    <template v-else>
      <van-loading size="1.5rem" vertical />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TabOne from '@/components/TabOne.vue';
import SideBar from '@/components/SideBar.vue';
import GoodsList from '@/components/GoodsList.vue';

export default {
  components: {
    TabOne,
    SideBar,
    GoodsList,
  },
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
    }),
  },
};
</script>

<style scoped lang="less">
.classify-container {
  width: 375px;
  height: 667px;
  overflow: hidden;
}
</style>
