<template>
  <div class="tally">
    <!-- 记账类型 -->
    <section class="type_wrap">
      <el-row class="type">
        <el-col
          :span="12"
          :class="['expense', { checked: type === 0 }]"
          @click.native.stop="type = 0"
          >支出</el-col
        >
        <el-col
          :span="12"
          :class="['income', { checked: type === 1 }]"
          @click.native.stop="type = 1"
          >收入</el-col
        >
      </el-row>
    </section>

    <!-- 标签 -->
    <section class="tags">
      <div class="tags_left">标签</div>
      <ul class="tags_right">
        <li
          :class="['tags_item', { checked: item === selectedTag }]"
          v-for="(item, index) in tags"
          :key="index"
          @click.stop="selectedTag = item"
        >
          {{ item }}
        </li>
      </ul>
    </section>

    <!-- 主要部分 -->
    <section class="main">
      <!-- input输入框 -->
      <section class="input_wrap">
        <!-- 备注 -->
        <label for="remark" class="remark_wrap">
          <span class="remark">备注</span>
          <input
            class="remarkInput"
            type="text"
            id="remark"
            v-model="remark"
            placeholder="请输入备注"
          />
        </label>
        <!-- 金额 -->
        <div class="price_wrap">
          <span class="title">金额</span>
          <p class="price">{{ price }}</p>
        </div>
      </section>

      <!-- 计算器 -->
      <section class="calc_wrap">
        <ul class="calc">
          <li
            v-for="(item, index) in calcData"
            :key="index"
            :class="[
              'calc_item',
              { confirm: item === '确认' },
              { zero: item === 0 },
            ]"
            @click.stop="calcPrice(item)"
          >
            {{ item }}
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      type: 0, // 记账的类型， 支出为0，收入为1
      price: 0, // 金额
      remark: "", // 备注
      remarkMaxLength: 10, // 备注的最大长度
      selectedTag: this.$store.getters.getTags[0], //选中的标签，初始化默认选第一个
      tags: this.$store.getters.getTags, // 标签
      calcData: [1, 2, 3, "删除", 4, 5, 6, "清空", 7, 8, 9, "确认", 0, "."],
    };
  },
  methods: {
    // 计算金额
    calcPrice(val) {
      switch (val) {
        case "删除":
          if (this.price.length > 1) {
            this.price = this.price.slice(0, this.price.length - 1);
          } else {
            this.price = 0;
          }
          break;
        case "确认":
          this.submit();
          break;
        case "清空":
          this.price = 0;
          break;
        case ".":
          // 当有小数点时，不改变this.price
          if (!this.price.includes(".")) {
            this.price = `${this.price}${val}`;
          }
          break;
        default:
          if (Number(this.price) > 10000000) {
            this.price = this.price.slice(0, this.price.length - 1);
            this.$message.info("亲，金额不能大于1000万");
          } else {
            this.price = this.price == "0" ? `${val}` : `${this.price}${val}`;
          }
          break;
      }
    },

    // 当点击确认时，校验并提交信息
    submit() {
      if (this.remark.trim() && Number(this.price)) {
        let createdTime = new Date().getTime();
        let type = this.type;
        let price = this.price;
        let remark = this.remark;
        let tag = this.selectedTag;
        let data = { createdTime, type, price, remark, tag };
        // 想vuex提交数据
        this.$store.commit("setTallyData", data);
        // 提交完数据把金额和备注初始化
        this.price = 0;
        this.remark = "";
        this.$message.success("保存成功");
      } else {
        this.$message.info("亲，备注不能为空，金额也不能为0哦");
      }
    },
  },
  watch: {
    remark(val) {
      if (val.length > this.remarkMaxLength) {
        this.remark = this.remark.slice(0, this.remarkMaxLength);
        this.$message.info(`亲，备注字数不能超过${this.remarkMaxLength}个`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/styles/scss";
.tally {
  // 记账类型
  .type_wrap {
    background-color: $theme_blue;
    color: $white;
    .type {
      text-align: center;
      .expense,
      .income {
        position: relative;
        padding: 18px 0;
      }
      // 点击样式
      .checked {
        &::after {
          content: "";
          position: absolute;
          bottom: 5px;
          left: 50%;
          margin-left: -25px;
          display: inline-block;
          width: 50px;
          height: 3px;
          background-color: $white;
          border-radius: 2px;
          // animation动画
          animation: move 0.3s cubic-bezier(0.61, 0.01, 0.44, 1.79);
          @keyframes move {
            from {
              left: 30%;
              opacity: 0;
            }
            to {
              left: 50%;
              opacity: 1;
            }
          }
        }
      }
    }
  }

  // 标签
  .tags {
    display: flex;
    padding: 40px 15px;
    .tags_left {
      flex: 0 0 40px;
      flex-basis: 40px;
      margin-right: 20px;
      font-size: 16px;
      font-weight: 700;
    }
    .tags_right {
      display: flex;
      flex-wrap: wrap;
      max-height: 200px;
      overflow: auto;
      .tags_item {
        margin: 0 10px 10px 0;
        padding: 10px 15px;
        background-color: $white;
        border-radius: 10px;
      }
      .checked {
        background-color: $theme_blue;
        color: $white;
      }
    }
  }

  // 主要部分
  .main {
    position: fixed;
    z-index: 1;
    bottom: 66px;
    // 备注和金额
    .input_wrap {
      padding: 20px 15px;
      background-color: $white;
      .remark_wrap {
        display: flex;
        margin-bottom: 30px;
        .remark {
          font-weight: 700;
        }
        .remarkInput {
          flex-grow: 1;
          text-align: right;
          &:focus {
            outline: none;
          }
        }
      }
      .price_wrap {
        display: flex;
        .title {
          font-weight: 700;
        }
        .price {
          flex-grow: 1;
          text-align: right;
        }
      }
    }

    // 计算器
    .calc_wrap {
      .calc {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 52px);
        grid-template-areas:
          "a b c d"
          "e f g h"
          "i j k l"
          "m n o l";
        line-height: 52px;
        text-align: center;
        width: 100vw;
        background: $light_gray;
        .calc_item {
          border: $divider_black;
          &:active {
            background-color: $light_blue;
          }
        }
        // 确认框占两行
        .confirm {
          grid-column: 4;
          grid-row-start: 3;
          grid-row-end: 5;
          line-height: 104px;
        }
        // 0独占两列
        .zero {
          grid-row: 4;
          grid-column-start: 1;
          grid-column-end: 3;
        }
      }
    }
  }
}
</style>
