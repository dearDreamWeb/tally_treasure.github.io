<template>
  <div class="home_content">
    <!-- 提示 -->
    <div class="content">
      <p class="title">今天是</p>
      <p class="date">
        {{
          `${new Date().getFullYear()}年${new Date().getMonth() +
            1}月${new Date().getDate()}日
          `
        }}
      </p>
      <p class="tip">点击下方「记账」记一笔吧~</p>
    </div>

    <!-- 列表 -->
    <section class="lists">
      <header class="lists_header">
        <i class="el-icon-document icon"></i>
        <span class="recently">最近</span>
      </header>
      <!-- TallyDataLists组件 -->
      <tally-data-lists
        :tallyData="tallyData"
        v-if="tallyData.length > 0"
      ></tally-data-lists>

      <p class="noData" v-else>暂无数据</p>
    </section>
  </div>
</template>

<script>
import TallyDataLists from "@/components/TallyDataLists";
export default {
  data() {
    return {
      // 获取vuex中的记账数据，只要前七条
      tallyData: this.$store.getters.getTallyData.slice(0, 7),
    };
  },
  components: {
    TallyDataLists,
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/styles/scss";

.home_content {
  // 提示内容
  .content {
    @include common_content;
    .date,
    .tip {
      text-align: center;
    }
    .date {
      padding: 30px 0;
      font-size: 35px;
      word-spacing: 0;
    }
    .tip {
      padding-bottom: 15px;
    }
  }

  //   列表
  .lists {
    .lists_header {
      display: flex;
      align-items: center;
      padding: 15px 15px;
      .icon {
        font-size: 32px;
      }
      .recently {
        padding-left: 5px;
        font-weight: 700;
      }
    }
    .noData {
      padding-left: 18px;
      font-size: 40px;
      opacity: 0.5;
    }
  }
}
</style>
