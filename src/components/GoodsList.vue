<template>
  <div class="goods-list-container">
    <div class="list-header">
      <div :class="{ active: sort === 'all' }" @click="changeSort(sort = 'all')">综合</div>
      <div :class="{ active: sort === 'sale' }" @click="changeSort(sort = 'sale')">销量</div>
      <div class="price"
        :class="{ price_up: sort === 'price-up', price_down: sort === 'price-down'}"
        @click="changeSort()"
      >价格</div>
    </div>
    <div class="list-content">
      <van-pull-refresh class="refresh" v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <good-card v-for="item in goodsList"
            :key="item.id + Math.random()"
            :num="counterItem[item.id]"
            v-bind="item"></good-card>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import GoodCard from '@/components/GoodCard.vue';

export default {
  data() {
    return {
      sort: 'all',
      refreshing: false, // 是否处于加载中状态，操作完成后设置为 false，表示加载完成
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      nowPage: 1,
    };
  },
  components: {
    GoodCard,
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goodsList,
      counterItem: (state) => state.counterItem,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
    changeSort(sort) {
      if (sort === 'all') {
        this.sort = 'all';
      } else if (sort === 'sale') {
        this.sort = 'sale';
      } else {
        this.sort = this.sort === 'price-up' ? 'price-down' : 'price-up';
      }
      this.onRefresh();
    },
    onRefresh() {
      this.refreshing = true;
      this.finished = false;
      this.nowPage = 1;
      this.resetGoodsList();
      this.getGoodsList({ type: this.goodsType, page: this.nowPage, sort: this.sort });
      this.refreshing = false;
    },
    // 滚动条与底部距离小于 offset时触发
    // 下拉刷新只触发一次onload，onload需要单独设置loading和finished，finished要在全部加载完成时设置。
    // 使用定时器防抖，loading不要立刻设置为false。否则会频繁触发onload。官方文档也配合了定时器使用。
    onLoad() {
      if (this.finished) {
        return;
      }
      this.loading = true;
      this.nowPage += 1;
      setTimeout(() => {
        this.getGoodsList({ type: this.goodsType, page: this.nowPage, sort: this.sort });
        this.loading = false;
      }, 500);
      if (this.goodsList.length >= this.$store.state.total) {
        this.finished = true;
      }
    },
  },
  watch: {
    '$store.state.goodsType': function () {
      this.finished = false;
      this.nowPage = 1;
      this.onLoad();
    },
  },
};
</script>

<style scoped lang="less">
.goods-list-container {
  .list-header {
    width: 296px;
    margin-left: 79px;
    display: flex;
    justify-content: flex-end;
    background: #fff;
    font-size: 12px;
    padding: 0 8px;
    box-sizing: border-box;
    border: 1px solid #eee;
    > div {
      width: 50px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: #cecece;
      position: relative;
    }
    .price::before {
      content: "";
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      position: absolute;
      right: 0px;
      top: 4px;
    }
    .price::after {
      content: "";
      border: 4px solid transparent;
      border-top-color: #aaa;
      position: absolute;
      right: 0px;
      bottom: 4px;
    }
    .active, .price_up, .price_down {
      color: #ff1a90;
    }
    .price_up::before {
      border-bottom-color: #ff1a90;
    }
    .price_down::after {
      border-top-color: #ff1a90;
    }
  }
  .list-content {
    position: fixed;
    left: 79px;
    bottom: 50px;
    top: 162px;
    right: 0;
    overflow: auto;
    .refresh {
      overflow: visible;
    }
  }
}
</style>
