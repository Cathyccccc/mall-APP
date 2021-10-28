/**
 * 平滑移动导航条
 * @param {Number} start 开始位置
 * @param {Number} end 结束位置
 * @param {Element} dom 滚动元素
 * @param {String} prop 滚动元素的变化属性
 */
/* eslint-disable no-param-reassign */
function move(start, end, dom, prop) {
  let speed = 5;
  if (end < 0) {
    speed *= -1;
  }
  let dis = 0;
  const timer = setInterval(() => {
    dis += speed;
    dom[prop] = start + dis;
    if (Math.abs(dis) > Math.abs(end)) {
      dom[prop] = start + end;
      clearInterval(timer);
    }
  }, 3);
}

export default {
  move,
};
