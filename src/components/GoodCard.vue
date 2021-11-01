<template>
  <div class="good-card-container">
    <div class="card">
      <div class="card-img">
        <img :src="images[0]" ref="img">
      </div>
      <div class="card-content">
        <div class="title overflow-hidden">{{ title }}</div>
        <div class="desc overflow-hidden">{{ desc }}</div>
        <div class="tags">
          <div v-for="t in tags" :key="t">{{ t }}</div>
        </div>
        <div class="price">￥{{ price }}</div>
        <div class="counter">
          <div class="left-counter" @click="changeNum(id, -1)" v-if="num">
            <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
          </div>
          <div class="num" v-if="num">{{ num }}</div>
          <div class="right-counter" @click="changeNum(id, 1)">
            <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from '@/utils/animate';

export default {
  props: ['title', 'desc', 'images', 'price', 'tags', 'num', 'id'],
  // data() {
  //   return {
  //     num: 0,
  //   };
  // },
  methods: {
    ...mapMutations(['storageChange']),
    changeNum(id, i) {
      this.storageChange({ id, value: i });
      const { left, top } = this.$refs.img.getBoundingClientRect();
      const { width: imgWidth, height: imgHeight } = this.$refs.img.getBoundingClientRect();
      const shopCar = document.getElementById('shop-car');
      const { left: carLeft, top: carTop } = shopCar.getBoundingClientRect();
      const { width: carWidth, height: carHeight } = shopCar.getBoundingClientRect();
      Animate({
        startX: left,
        startY: top,
        endX: carLeft + carWidth / 2 - imgWidth / 2,
        endY: carTop + carHeight / 2 - imgHeight / 2,
        imgSrc: this.$refs.img.src,
        width: imgWidth,
        height: imgHeight,
      });
    },
  },
};
</script>

<style scoped lang="less">
.card {
  height: 100px;
  background: #fff;
  display: flex;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  .card-img {
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    margin-left: 20px;
    position: relative;
    > div {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      font-size: 11px;
      color: #aaa;
      margin-top: 5px;
    }
    .tags {
      > div {
        font-size: 10px;
        color: #aaa;
        margin-top: 4px;
        border: 1px solid #aaa;
        display: inline-block;
        border-radius: 3px;
        padding: 2px;
      }
    }
    .price {
      font-size: 14px;
      color: #ff1a90;
      margin-top: 4px;
      font-weight: bold;
    }
    .counter {
      position: absolute;
      bottom: 10px;
      display: flex;
      justify-content: flex-end;
      img {
        width: 16px;
        height: 16px;
        padding: 2px 0;
      }
      .num {
        line-height: 22px;
        padding: 0 5px;
      }
    }
  }
  .overflow-hidden {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
