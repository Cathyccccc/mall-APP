<template>
  <div class="cart-container">
    <div class="cart-head">
      <van-nav-bar
        title="购物车"
        right-text="删除"
        @click-right="del"
      />
    </div>
    <div class="cart-list">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="checkbox" v-for="item in list" :key="item.id">
          <van-checkbox :name="item.id" class="check-item"></van-checkbox>
          <good-card v-bind="item" :num="counterItem[item.id]" :nofly="true"></good-card>
        </div>
      </van-checkbox-group>
    </div>
    <div class="cart-foot">
      <van-submit-bar :price="allMoney" :button-text="`结算(${totalNum})`">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Toast, Dialog } from 'vant';
import GoodCard from '@/components/GoodCard.vue';
import api from '@/api/api';

export default {
  data() {
    return {
      checked: false,
      result: [], // 由选中项的id构成的数组，和name值对应
      list: [],
    };
  },
  components: {
    GoodCard,
  },
  computed: {
    ...mapState({
      counterItem: (state) => state.counterItem,
    }),
    totalNum() {
      let numArr = this.list.filter((item) => this.result.includes(item.id));
      numArr = numArr.filter((item) => this.counterItem[item.id] > 0);
      const total = numArr.reduce((prev, next) => prev + this.counterItem[next.id], 0);
      return total;
    },
    allMoney() {
      const moneyArr = this.list.filter((item) => this.result.includes(item.id));
      const money = moneyArr.reduce((prev, next) => {
        const num = this.counterItem[next.id] || 0;
        return prev + num * next.price * 100;
      }, 0);
      return money;
    },
  },
  methods: {
    ...mapMutations(['storageChange']),
    del() {
      if (this.result.length === 0) {
        Toast('没有商品需要删除');
      }
      Dialog.confirm({
        message: '确认删除选中商品',
      })
        .then(() => {
          // on confirm
          this.list = this.list.filter((item) => !this.result.includes(item.id));
          this.result.forEach((item) => this.storageChange({ id: item, value: -Infinity }));
        })
        .catch(() => {
          // on cancel
          // console.log(error);
          Toast('用户取消删除');
        });
    },
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
  },
  async created() {
    const ids = Object.keys(this.counterItem).join();
    const res = await api.getGoodsByIds(ids);
    this.list = res.list;
  },
  watch: {
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
        console.log(this.result);
      }
    },
  },
};
</script>

<style scoped lang="less">
.cart-container {
  width: 100%;
  height: 100vh;
  background: #eee;
  .cart-head {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .cart-list {
    width: 100%;
    position: absolute;
    left: 0;
    top: 46px;
    padding: 10px 10px 100px 10px;
    box-sizing: border-box;
    background: #fff;
    .checkbox {
      display: flex;
      .check-item {
        width: 50px;
        flex-shrink: 0;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
  }
  .cart-foot {
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0;
    bottom: 50px;
    .van-submit-bar {
      position: absolute;
    }
  }
}
</style>
