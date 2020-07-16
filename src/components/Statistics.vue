<template>
  <div class="statistics">
    <header class="title">收支统计</header>
    <section class="echarts_wrap">
      <div id="echarts"></div>
    </section>
    <p class="footer">
      支出：{{ expenseMoney }}元 | 收入： {{ incomeMoney }}元
    </p>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入legend和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/model/Series");

export default {
  data() {
    return {
      tallyData: this.$store.getters.getTallyData,
      expenseMoney: 0, //支出总金额
      incomeMoney: 0, // 收入总金额
    };
  },
  methods: {
    //   初始化echarts表
    initEcharts() {
      //初始化echarts实例
      let myChart = echarts.init(document.getElementById("echarts"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          data: ["支出", "收入"],
        },
        series: [
          {
            name: "支出统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              {
                value: this.expenseMoney,
                name: "支出",
                itemStyle: {
                  color: "#e13a3a",
                },
              },
              {
                value: this.incomeMoney,
                name: "收入",
                itemStyle: {
                  color: "#15db89",
                },
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    // 初始化收入和支出总金额
    initMoney() {
      this.tallyData.forEach(item => {
        if (item.type === 0) {
          this.expenseMoney += Number(item.price);
        } else {
          this.incomeMoney += Number(item.price);
        }
      });
    },
  },
  mounted() {
    this.initMoney();
    this.$nextTick(() => this.initEcharts());
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/styles/scss";
.statistics {
  .title {
    margin-bottom: 20px;
    padding: 18px;
    background-color: $theme_blue;
    color: $white;
  }
  .echarts_wrap {
    display: flex;
    justify-content: center;
    #echarts {
      width: 300px;
      height: 300px;
    }
  }
  .footer {
    margin-top: 20px;
    padding: 8px 10px;
    text-align: center;
    width: 100vw;
    background-color: $theme_blue;
    color: $white;
    border-radius: 5px;
  }
}
</style>
