<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      lazy
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column prop="icon" label="图片">
        <template slot-scope="scope">
          <img v-if="scope.row.img!=='null'" :src="$pre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqCateDel } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["list"],
  methods: {
    del(id) {
      reqCateDel({ id }).then((res) => {
        if (res.data.code === 200) {
          //弹框
          successalert(res.data.msg);
          //刷新list
          this.$emit("init");
        }
      });
    },
    //编辑弹窗
    edit(id) {
      //通知父组件
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>
img{
    width: 80px;
    height: 80px;
}
</style>