<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    // 判断设备是移动端还是PC端
    device() {
      if (
        !navigator.userAgent.match(
          /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
        )
      )
        this.$alert(
          <div style="text-align:center; font-size:20px">
            <h1 style="margin-bottom:10px">
              请手机扫描二维码或者使用浏览器手机模式浏览
            </h1>
            <div>
              <img
                src="https://s1.ax1x.com/2020/07/16/UDwCE8.png"
                alt="二维码"
              />
            </div>
          </div>,
          "提示",
          {
            dangerouslyUseHTMLString: true,
          }
        );
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
