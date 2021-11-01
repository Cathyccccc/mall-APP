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
import { mapState, mapMutations, mapActions } from 'vuex';
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
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
  },
  watch: {
    showContent() {
      if (this.showContent) {
        this.resetGoodsList();
        this.getGoodsList({ type: this.sideList[0], page: 1, sort: 'all' });
      }
    },
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
