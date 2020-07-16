<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    device() {
      if (
        navigator.userAgent.match(
          /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
        )
      ) {
        console.log("手机访问");
      } else {
        console.log("电脑访问");
      }
    },
  },
  mounted() {
    this.device();
  },
};
</script>

<style lang="scss">
// element-ui的弹出输入框的样式修改
.el-message-box {
  width: 90vw !important;
}
</style>
