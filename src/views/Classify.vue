<template>
  <div class="classify-container">
    <tab-one></tab-one>
  </div>
</template>

<script>
import TabOne from '@/components/TabOne.vue';

export default {
  components: {
    TabOne,
  },
};
</script>

<style scoped lang="less">
.classify-container {
  width: 357px;
  height: 667px;
}
</style>
