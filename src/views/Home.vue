<template>
  <div class="home">
    <diy-header :navName="headerTiltle" />

    <!-- route-view部分 -->
    <router-view />

    <!-- 底部导航 -->
    <footer class="nav">
      <router-link
        v-for="(item, index) in navLists"
        :key="index"
        :to="item.path"
        :class="['nav_item', { checked: item.path === $route.path }]"
        @click.native.stop="headerTiltle = item.title"
      >
        <i :class="[item.icon, 'icon']"></i>
        <p class="nav_title">{{ item.title }}</p>
      </router-link>
    </footer>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "Home",
  data() {
    return {
      headerTiltle: "首页",
      navLists: [
        {
          icon: "el-icon-house",
          title: "首页",
          path: "/home",
        },
        {
          icon: "el-icon-notebook-2",
          title: "明细",
          path: "/detail",
        },
        {
          icon: "el-icon-edit-outline",
          title: "记账",
          path: "/tally",
        },
        {
          icon: "el-icon-price-tag",
          title: "标签",
          path: "/tags",
        },
        {
          icon: "el-icon-pie-chart",
          title: "统计",
          path: "/statistics",
        },
      ],
    };
  },
  // mounted(){console.log(this.$route)},
  components: {
    diyHeader: Header,
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/styles/scss";
.home {
  width: 100vw;
  height: 100vh;
  background: $gray;
  // 底部导航
  .nav {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 5px 0;
    display: flex;
    width: 100vw;
    height: 66px;
    background-color: $deep_gray;
    .nav_item {
      display: inline-block;
      flex-basis: 20%;
      text-align: center;
      color: $black;
      .icon {
        font-size: 32px;
      }
      .nav_title {
        padding-top: 5px;
        font-size: 15px;
      }
    }
    // 导航区被点击样式
    .checked {
      color: $theme_blue;
    }
  }
}
</style>
