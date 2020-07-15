<template>
  <div class="tallyData_lists">
    <ul>
      <li v-for="(item, index) in tallyData" :key="index">
        <el-row class="tallyData_item">
          <el-col class="tag">{{ item.tag }}</el-col>
          <el-col class="remark">{{ item.remark }}</el-col>
          <el-col :class="['price', item.type === 0 ? 'expense' : 'income']"
            >￥{{ item.price }}
          </el-col>
          <el-col class="time">{{ item.createdTime | filterDate }}</el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>

<script>
import { filterDate } from "@/filters/index.js";
export default {
  props: {
    tallyData: {
      type: Array,
      required: true,
    },
  },
  filters: {
    filterDate,
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/styles/scss";
.tallyData_lists {
  .tallyData_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 6px 8px;
    background-color: $white;
    border-radius: 5px;
    .remark {
      font-size: 14px;
      color: $black;
      opacity: 0.5;
    }
    .price {
      word-break: break-all;
    }
    .time {
      text-align: right;
      font-size: 12px;
      color: $black;
      opacity: 0.5;
    }
    .expense {
      color: red;
    }
    .income {
      color: green;
    }
  }
}
</style>
