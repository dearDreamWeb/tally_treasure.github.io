import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 标签  如果localStorage里没有tags就默认["默认","衣","食","住","行"]
    tags: window.localStorage.getItem("tags") ? JSON.parse(window.localStorage.getItem("tags")) : ["默认", "衣", "食", "住", "行"],
    // 记账的数据
    tallyData: window.localStorage.getItem("tallyData") ? JSON.parse(window.localStorage.getItem("tallyData")) : []
  },
  getters: {
    // 标签
    getTags(state) {
      return state.tags;
    },
    // 获取记账数据
    getTallyData(state) {
      return state.tallyData;
    }
  },
  mutations: {
    // 更新标签
    setTags(state, data) {
      state.tags = data;
      window.localStorage.setItem("tags", JSON.stringify(data));
    },
    // 更新记账数据
    setTallyData(state, data) {
      let newData = [data, ...state.tallyData];
      state.tallyData = newData;
      window.localStorage.setItem("tallyData", JSON.stringify(newData));
    }
  }
});
