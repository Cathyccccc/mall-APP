<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <div class="search-head">
      <van-icon name="arrow-left" class="arrow-left" />
      <van-search
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="handleInput(value)"
        @focus="onFocus"
        class="search"
      >
        <template #action v-if="showLike">
          <div @click="onSearch(value)">搜索</div>
        </template>
        <template #action v-else>
          <van-icon name="cart-o" size="40"
            :badge="badge" id="shop-car"
            @click="$router.push('/home/cart')"
          />
        </template>
      </van-search>
    </div>
    <!-- 搜索列表 -->
    <div class="search-list" v-if="showLike">
      <van-list class="list">
        <van-cell v-for="item in likeList"
          :key="item"
          class="cell"
          @click="onSearch(item)"
        >
          <template>
            <span v-html="format(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <!-- 内容列表 -->
    <div class="goods-list" v-else>
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
          v-bind="item"
          class="good-card"
        ></good-card>
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api/api';
import GoodCard from '@/components/GoodCard.vue';

export default {
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      size: 5,
      goodsList: [],
      loading: false,
      finished: false,
      nowPage: 1,
      showLike: true,
      timer: null,
    };
  },
  components: {
    GoodCard,
  },
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
  methods: {
    onSearch(item) {
      if (item) {
        this.value = item;
      } else {
        this.value = this.place;
      }
      this.goodsList = [];
      this.finished = false;
      this.loading = false;
      this.nowPage = 1;
      this.likeList = [];
      this.showLike = true;
      this.onLoad();
    },
    // input事件--防抖
    async handleInput() {
      if (this.value === '') {
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const res = await api.likeSearch(this.value);
          this.likeList = res.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    onFocus() {
      this.showLike = true;
      this.likeList = [];
      this.goodsList = [];
      this.handleInput();
    },
    format(text) {
      const reg = new RegExp(this.value, 'g');
      return text.replace(reg, this.value.fontcolor('red'));
    },
    onLoad() {
      if (this.finished) {
        return;
      }
      this.showLike = false;
      this.loading = true;
      setTimeout(async () => {
        const res = await api.search({ type: this.value, page: this.nowPage, size: this.size });
        this.goodsList = [...this.goodsList, ...res.list];
        this.loading = false;
        if (this.goodsList.length >= res.total) {
          this.finished = true;
        } else {
          this.nowPage += 1;
        }
      }, 500);
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  width: 100%;
  height: 100vh;
  padding: 0px 10px;
  box-sizing: border-box;
  position: relative;
  .search-head {
    z-index: 20;
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    width: 360px;
    .arrow-left {
      font-size: 20px;
      padding-left: 5px;
      box-sizing: border-box;
    }
    .search {
      flex: 1;
    }
  }
  .search-list {
    position: relative;
    top: 54px;
    bottom: 50px;
    .cell {
      font-size: 12px;
    }
  }
  .goods-list {
    position: relative;
    top: 54px;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>
