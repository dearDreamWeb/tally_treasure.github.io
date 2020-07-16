<template>
  <div class="detail">
    <header class="title">全部收支</header>
    <section class="lists_wrap" v-if="tallyData.length > 0">
      <tally-data-lists :tallyData="tallyData"></tally-data-lists>
    </section>
    <section class="noData" v-else>
      暂无数据
    </section>
  </div>
</template>

<script>
import TallyDataLists from "@/components/TallyDataLists";
export default {
  data() {
    return {
      // 获取vuex中的记账数据
      tallyData: this.$store.getters.getTallyData,
    };
  },
  components: {
    TallyDataLists,
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/styles/scss";
.detail {
  .title {
    margin-bottom: 20px;
    padding: 18px;
    background-color: $theme_blue;
    color: $white;
  }
  .lists_wrap {
    padding-bottom: 66px;
  }
  .noData {
    padding-left: 18px;
    font-size: 40px;
    opacity: 0.5;
  }
}
</style>
