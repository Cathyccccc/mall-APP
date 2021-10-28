<template>
  <div class="tab-one-container">
    <router-link tag="div" to="/search" class="search-btn">
      <van-icon name="search" />
      <div>限时秒杀，最低享1折</div>
    </router-link>
    <div class="tab-list" ref="tabList">
      <div class="tab-item"
        :class="{ active: index === i}"
        v-for="(item, i) in menuList"
        :key="item.title"
        @touchend="scrollTo(i, $event)"
        @touchstart="scroll = false"
        @touchmove="scroll = true"
      >
        <div class="tab-image">
          <img :src="item.imgURL" alt="">
        </div>
        <div class="tab-title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import tools from '@/utils/tools';

const menuList = [
  {
    title: '时令水果',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
  },
  {
    title: '酒水冲调',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
  },
  {
    title: '安心乳品',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
  },
  {
    title: '休闲零食',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
  },
  {
    title: '肉蛋食材',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
  },
  {
    title: '新鲜蔬菜',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
  },
  {
    title: '熟食餐饮',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
  },
  {
    title: '海鲜水产',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
  },
  {
    title: '粮油调味',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
  },
  {
    title: '某手美食',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
  },
  {
    title: '纸杯清洁',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
  },
  {
    title: '个人护理',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
  },
  {
    title: '美妆护肤',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
  },
  {
    title: '家居收纳',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
  },
  {
    title: '家用电器',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
  },
  {
    title: '3C数码',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
  },
  {
    title: '母婴用品',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
  },
  {
    title: '鲜花绿植',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
  },
  {
    title: '宠物用品',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
  },
  {
    title: '图书玩具',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
  },
  {
    title: '手表配饰',
    imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
  },
];
export default {
  data() {
    return {
      menuList,
      index: 0,
      scroll: false,
    };
  },
  methods: {
    ...mapActions(['getSideList']),
    scrollTo(i, e) {
      // 如果在拖拽移动过程中，什么也不做
      // 拖拽过程中，设置为true
      // 触屏时，设置为false(看接下来要做什么)
      if (this.scroll) {
        return;
      }
      this.index = i;
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const pWidth = this.$refs.tabList.offsetWidth;
      const dom = this.$refs.tabList;
      tools.move(dom.scrollLeft, itemWidth / 2 + itemLeft - pWidth / 2, dom, 'scrollLeft');
    },
  },
  created() {
    this.getSideList(this.menuList[this.index]);
  },
};
</script>

<style scoped lang="less">
.tab-one-container {
  width: 375px;
  .search-btn {
    width: 355px;
    height: 33px;
    background-color: #eee;
    margin: 11px auto 0;
    border-radius: 10px;
    line-height: 33px;
    text-align: center;
    font-size: 14px;
    color: #a1a1a1;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .tab-list {
    display: flex;
    overflow: auto;
    .tab-item {
      width: 50px;
      height: 70px;
      padding: 10px 5px;
      .tab-image {
        width: 100%;
        height: 50px;
        border: 2px solid #fff;
        border-radius: 23px;
        display: flex;
        justify-content: center;
        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          align-self: center;
        }
      }
      .tab-title {
        margin-top: 5px;
        text-align: center;
        font-size: 12px;
      }
    }
    .active {
      .tab-image {
        border-color: #d13193;
      }
      .tab-title {
        background-color: #d13193;
        border-radius: 30px;
        color: #fff;
        font-weight: bold;
      }
    }
  }
}
.tab-list::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>
