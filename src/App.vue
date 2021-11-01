<template>
  <div id="app">
    <transition :name="transitionName" :mode="$router.back ? 'out-in' : 'in-out'">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'left',
    };
  },
  created() {
    const counterItem = JSON.parse(localStorage.getItem('counterItem')) || {};
    this.$store.commit('setCounterItem', counterItem);
    // console.log(this.$router.back);
  },
  watch: {
    $route(to, from) {
      if (to.name === 'classify' && from.name === 'search') {
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = 'right';
      } else {
        this.transitionName = 'left';
      }
      this.$router.back = false;
    },
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.view {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: transform .4s linear;
}
.left-enter {
  transform: translate(100%, 0);
}
.right-leave-to {
  transform: translate(100%, 0);
}
</style>
