<template>
  <div class="tags">
    <header class="title">全部标签</header>
    <section class="tags_wrap">
      <ul>
        <li v-for="(item, index) in tags" :key="index" class="tags_item">
          <span class="tag_name">{{ item }} </span>
          <div class="icons">
            <i class="el-icon-edit edit" @click="editTag(index)"></i>
            <i class="el-icon-delete delete" @click="deleteTag(index)"></i>
          </div>
        </li>
      </ul>
      <section class="add_btn">
        <el-button type="primary" icon="el-icon-plus" @click="addTag"
          >新建标签</el-button
        >
      </section>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取vuex中的标签
      tags: this.$store.getters.getTags,
    };
  },
  methods: {
    // 修改标签
    editTag(index) {
      this.$prompt("请输入新的标签名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.tags[index],
        inputPattern: /^\S{1,6}$/,
        inputErrorMessage: "不能有空格，字数不能超过6个",
      })
        .then(({ value }) => {
          if (this.tags.includes(value)) {
            this.$message.warning("标签名重复");
          } else {
            let newTags = this.tags;
            newTags[index] = value;
            this.tags = [...newTags];
            this.$store.commit("setTags", newTags);
            this.$message.success("你的修改的新标签名是: " + value);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },

    // 删除标签
    deleteTag(index) {
      this.$confirm("确定删除该标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tags.splice(index, 1);
          this.$store.commit("setTags", this.tags);
          this.$message.success("删除标签成功");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 添加标签
    addTag() {
      this.$prompt("请输入标签名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\S{1,6}$/,
        inputErrorMessage: "不能有空格，字数不能超过6个",
      })
        .then(({ value }) => {
          if (this.tags.includes(value)) {
            this.$message.warning("标签名重复");
          } else {
            this.tags.push(value);
            this.$store.commit("setTags", this.tags);
            this.$message.success("新建的标签名是: " + value);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/styles/scss";
.tags {
  .title {
    margin-bottom: 20px;
    padding: 18px;
    background-color: $theme_blue;
    color: $white;
  }
  // 标签列表
  .tags_wrap {
    padding-bottom: 66px;
    .tags_item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 10px 18px;
      background-color: $white;
      border-radius: 5px;
      font-size: 18px;
      .icons {
        .edit {
          padding-right: 20px;
          color: $theme_blue;
        }
        .delete {
          color: $red;
        }
      }
    }
    // 按钮
    .add_btn {
      display: flex;
      justify-content: center;
      background-color: $gray;
    }
  }
}
</style>
