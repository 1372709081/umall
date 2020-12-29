<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 表格 -->
    <v-list
      :num="num"
      :total="total"
      @page="page($event)"
      :list="list"
      @init="init"
      @edit="edit($event)"
    ></v-list>
    <!-- 添加 -->
    <v-add
      :info="info"
      :List="List"
      @init="init"
      :idArr="idArr"
      ref="add"
    ></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqUserCount, reqUserList, reqRoleList } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //页码
      num: { size: 2, page: 1 },
      total: 0,
      //列表
      list: [],
      //所属角色
      List: [],
      info: {
        isshow: false,
        show: false,
      },
      idArr: [],
    };
  },
  methods: {
    init() {
      this.getList();
      this.getTotal();
    },
    getList() {
      //请求列表
      reqUserList(this.num).then((res) => {
        if (res.data.code == 200) {
          if (res.data.list.length == 0 && this.num.page > 1) {
            this.num.page--;
            this.getList();
            return;
          }
          this.list = res.data.list;
        }
      });
    },
    getTotal() {
      //请求列表总数
      reqUserCount().then((res) => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
        }
      });
    },
    page(n) {
      this.num.page = n;
      this.init();
    },
    add() {
      this.info.isshow = true;
      this.info.show = true;
    },
    //编辑触发弹框
    edit(uid) {
      this.info.isshow = true;
      this.info.show = false;
      this.$refs.add.User(uid);
    },
  },
  mounted() {
    //请求角色
    reqRoleList().then((res) => {
      if (res.data.code == 200) {
        this.List = res.data.list;
        this.List.forEach((item) => {
          this.idArr.push(item.id);
        });
      }
    });
    this.init();
  },
};
</script>

<style>
</style>