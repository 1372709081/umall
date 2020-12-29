<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 表格 -->
    <v-list :data="data" @init="init" @edit="edit($event)"></v-list>
    <!-- 添加 -->
    <v-add :info="info" :list="list" @init="init" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqMenuList, reqRoleList } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        show: false,
      },
      //初始化添加表单内
      list: [],
      //初始化列表数据
      data: [],
    };
  },
  methods: {
    add() {
      this.info.isshow = true;
      this.info.show = true;
    },
    init() {
      //请求添加表单数据
      reqMenuList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
      //请求列表数据
      reqRoleList().then((res) => {
        if (res.data.code == 200) {
          this.data = res.data.list;
        }
      });
    },
    //编辑触发弹框
    edit(id) {
      this.info.isshow = true;
      this.info.show = false;
      this.$refs.add.getUser(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>