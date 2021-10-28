<template>
  <div class="goods-list-container">
    <div class="list-header">
      <div :class="{ active: sort === 'all' }" @click="changeSort(sort = 'all')">综合</div>
      <div :class="{ active: sort === 'sale' }" @click="changeSort(sort = 'sale')">销量</div>
      <div class="price"
        :class="{ price_up: sort === 'price_up', price_down: sort === 'price_down'}"
        @click="changeSort()"
      >价格</div>
    </div>
    <div class="list-content">
      <good-card v-for="item in goodsList" :key="item.id" v-bind="item"></good-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GoodCard from '@/components/GoodCard.vue';

export default {
  data() {
    return {
      sort: 'all',
    };
  },
  components: {
    GoodCard,
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goodsList,
    }),
  },
  methods: {
    changeSort(sort) {
      if (sort === 'all') {
        this.sort = 'all';
      } else if (sort === 'sale') {
        this.sort = 'sale';
      } else {
        this.sort = this.sort === 'price_up' ? 'price_down' : 'price_up';
      }
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
  }
}
</style>
