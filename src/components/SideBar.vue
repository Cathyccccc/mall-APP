<template>
  <div class="side-bar-container" ref="sideBar">
    <div v-for="(item, i) in sideList" :key="item"
      :class="{ active: index === i }"
      @touchend="scrollTo(i, $event)"
      @touchstart="scroll = false"
      @touchmove="scroll = true"
    >{{ i === 0 ? '全部' : item }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import tools from '@/utils/tools';

export default {
  data() {
    return {
      index: 0,
      scroll: false,
    };
  },
  computed: {
    ...mapState({
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList', 'changeGoodsType']),
    ...mapActions(['getGoodsList']),
    scrollTo(i, e) {
      // 如果在拖拽移动过程中，什么也不做
      // 拖拽过程中，设置为true
      // 触屏时，设置为false(看接下来要做什么)
      if (this.scroll) {
        return;
      }
      this.index = i;
      const itemHeight = e.target.offsetHeight;
      const itemTop = e.target.getBoundingClientRect().top;
      const pHeight = this.$refs.sideBar.offsetHeight;
      const pTop = this.$refs.sideBar.getBoundingClientRect().top;
      const dom = this.$refs.sideBar;
      tools.move(dom.scrollTop, itemHeight / 2 + itemTop - pHeight / 2 - pTop, dom, 'scrollTop');
      this.resetGoodsList();
      this.getGoodsList({ type: this.sideList[i], page: 1, sort: 'all' });
    },
  },
  mounted() {
    this.getGoodsList({ type: this.sideList[0], page: 1, sort: 'all' });
  },
};
</script>

<style scoped lang="less">
.side-bar-container {
  width: 79px;
  position: fixed;
  left: 0px;
  top: 135px;
  bottom: 50px;
  background-color: #f8f8f8;
  overflow: auto;
  div {
    width: 79px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    position: relative;
  }
  .active {
    color: #ff1a90;
    &::before {
      content: '';
      width: 6px;
      height: 18px;
      background-color: #ff1a90;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.side-bar-container::-webkit-scrollbar {
  width: 0;
  background-color: none;
}
</style>
