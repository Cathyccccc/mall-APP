<template>
  <div class="item" :style="{ width: `${width}px`, height: `${height}px`, opacity,
    transform: `translate(${moveX}px, ${moveY}px) scale(${scaleX}, ${scaleY})`}"
    v-if="exist">
    <img :src="imgSrc">
  </div>
</template>

<script>
export default {
};
</script>

<style scoped lang="less">
.item {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: all 1s;
  transform-origin: 50% 50%;
  img {
    width: 100%;
    border-radius: 50%;
  }
}
</style>
