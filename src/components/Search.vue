<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <div class="search-head">
      <van-icon name="arrow-left" class="arrow-left" @click="$router.goBack()" />
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
    <!-- 搜索历史 -->
    <div class="search-history" v-if="showLike && likeList.length <= 0">
      <my-history :searchList="searchList" @search="onSearch"></my-history>
    </div>
    <!-- 搜索列表 -->
    <div class="search-list" v-if="showLike && likeList.length">
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
    <div class="goods-list" v-else-if="!showLike">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <good-card v-for="item in goodsList"
          :key="item.id"
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
import MyHistory from '@/components/History.vue';

export default {
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      size: 7,
      goodsList: [],
      loading: false,
      finished: false,
      nowPage: 1,
      showLike: true,
      timer: null,
      searchList: [],
    };
  },
  components: {
    GoodCard,
    MyHistory,
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
    onSearch(value) {
      console.log(value);
      if (value) {
        this.value = value;
      } else {
        this.value = this.place;
      }
      const result = this.searchList.find((i) => i.value === this.value);
      console.log(result);
      if (result) {
        result.time = +new Date();
        this.searchList.sort((a, b) => a.time - b.time > 0);
      } else {
        if (this.searchList.length >= 10) {
          this.searchList.pop();
        }
        this.searchList.unshift({ value, time: +new Date() });
        localStorage.setItem('searchList', JSON.stringify(this.searchList));
      }
      this.goodsList = [];
      this.finished = false;
      this.loading = false;
      this.nowPage = 1;
      this.likeList = [];
      this.onLoad();
      this.showLike = false;
    },
    // input事件--防抖
    async handleInput() {
      if (this.value === '' || this.value === undefined) {
        this.likeList = [];
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
      this.loading = false;
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
      const timer = setTimeout(async () => {
        const res = await api.search({ type: this.value, page: this.nowPage, size: this.size });
        this.goodsList = [...this.goodsList, ...res.list];
        if (this.goodsList.length >= res.total) {
          this.finished = true;
          clearTimeout(timer);
        } else {
          this.loading = false;
          this.nowPage += 1;
        }
      }, 500);
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
};
</script>

<style scoped lang="less">
.search-container {
  width: 100%;
  height: 100vh;
  background: #fff;
  padding: 0px 10px;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
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
  .search-history {
    width: 100%;
    position: absolute;
    top: 54px;
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
    width: 100%;
    background: #fff;
  }
}
</style>
