import Vue from 'vue';
import animate from './index.vue';

const Animate = Vue.extend(animate);
export default function ({
  startX, startY, endX, endY, imgSrc, width, height,
}) {
  const app = new Animate({
    el: document.createElement('div'),
    data() {
      return {
        moveX: startX,
        moveY: startY,
        imgSrc,
        width,
        height,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        exist: true,
      };
    },
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.moveX = endX;
    app.moveY = endY;
    app.scaleX = 0.1;
    app.scaleY = 0.1;
    app.opacity = 0;
  }, 0);
  setTimeout(() => {
    app.exist = false;
  }, 1100);
}
