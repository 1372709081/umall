<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 表格 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  data() {
    return {
      //弹框状态
      info: {
        isshow: false,
        show: true,
      },
      //初始化数据
      list: [],
    };
  },
  components: {
    vList,
    vAdd,
  },
  methods: {
    //添加按钮
    add() {
      this.info.isshow = true;
      //判断弹窗
      this.info.show = true;
    },
    //编辑触发弹框
    edit(id) {
      this.info.isshow = true;
      this.info.show = false;
      this.$refs.add.get(id);
    },
  }
};
</script>

<style>
</style>