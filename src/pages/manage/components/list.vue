<template>
  <div>
    <template>
      <el-table :data="list">
        <el-table-column prop="id" label="用户编号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="rolename" label="所属角色"></el-table-column>
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
            <el-button type="primary" @click="edit(scope.row.uid)"
              >编辑</el-button
            >
            <del-btn @confirm="del(scope.row.uid)"></del-btn>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="num.size"
        :total="total"
        @current-change="pageNum"
      ></el-pagination>
    </template>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { reqUserDel } from "../../../utils/http";
export default {
  props: ["num", "total", "list"],
  methods: {
    //点击页码数
    pageNum(number) {
      this.$emit("page", number);
    },
    del(uid) {
      reqUserDel({ uid }).then((res) => {
        if (res.data.code === 200) {
          //弹框
          successalert(res.data.msg);
          //刷新list
          this.$emit("init");
        }
      });
    },
    edit(uid) {
      //通知父组件
      this.$emit("edit", uid);
    },
  },
};
</script>

<style>
</style>