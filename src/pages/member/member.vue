<template>
  <div>
    <el-table :data="list" stripe>
      <el-table-column prop="uid" label="用户编号"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import {
  reqMemberList,
  reqMemberDetail,
  reqMemberEdit,
} from "../../utils/http";
import vAdd from "./add.vue"
export default {
  components:{
    vAdd
  },
  data() {
    return {
      //弹框状态
      info:{
        isshow: false,
      },
      //初始化数据
      list: [],
    };
  },
  methods: {
    init() {
      reqMemberList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(uid){
      this.info.isshow = true
      this.$refs.add.get(uid);
    }
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>