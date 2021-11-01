<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  created() {
    const counterItem = JSON.parse(localStorage.getItem('counterItem')) || {};
    this.$store.commit('setCounterItem', counterItem);
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
}
</style>
