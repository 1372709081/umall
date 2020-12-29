<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 表格 -->
    <v-list :list="list" @init="init" @edit="edit"></v-list>
    <!-- 添加 -->
    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqBannerList } from "../../utils/http";
export default {
  data() {
    return {
      //弹框状态
      info: {
        isshow: false,
        show: false,
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
    init() {
      //请求数据
      reqBannerList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    //编辑触发弹框
    edit(id) {
      this.info.isshow = true;
      this.info.show = false;
      this.$refs.add.get(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>