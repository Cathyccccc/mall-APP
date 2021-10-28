<template>
  <div class="classify-container">
    <tab-one></tab-one>
    <side-bar></side-bar>
  </div>
</template>

<script>
import TabOne from '@/components/TabOne.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  components: {
    TabOne,
    SideBar,
  },
};
</script>

<style scoped lang="less">
.classify-container {
  width: 357px;
  height: 667px;
}
</style>
