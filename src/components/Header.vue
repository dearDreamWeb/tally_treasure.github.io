<template>
  <div class="header">
    <div class="nav_wrap">
      <i class="el-icon-user-solid icon"></i>
      <p class="title">记账宝</p>
      <span class="nav">{{ navName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navName: {
      type: String,
      required: true,
      default: "首页",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common/styles/scss";

.header {
  background-color: $theme_blue;
  color: $white;
  .nav_wrap {
    display: flex;
    align-items: center;
    padding: 18px 20px;
    height: 62px;
    border-bottom: $divider_white;
    .icon {
      font-size: 18px;
    }
    .title {
      flex-grow: 1;
      text-align: center;
      font-size: 22px;
    }
  }
}
</style>
