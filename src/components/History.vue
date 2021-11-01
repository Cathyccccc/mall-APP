<template>
  <div class="history-container">
    <h5>历史记录： </h5>
    <div class="history-item"
      v-for="item in searchList"
      :key="item.time"
      @click="search(item.value)"
    >{{ item.value }}</div>
  </div>
</template>

<script>
export default {
  props: ['searchList'],
  methods: {
    search(value) {
      this.$emit('search', value);
    },
  },
};
</script>

<style scoped lang="less">
.history-container {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .history-item {
    background: #eee;
    border-radius: 10px;
    font-size: 12px;
    padding: 10px;
    margin-left: 10px;
    margin-top: 10px;
    display: inline-block;
    // z-index: 100;
  }
}
</style>
