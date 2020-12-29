<template>
  <div>
    <el-dialog
      :title="info.show ? '添加角色' : '编辑角色'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="100px">
          <el-tree
            :data="list"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            ref="tree"
            v-model="user.menus"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="getCheckedKeys" type="primary" v-if="info.show"
          >添 加</el-button
        >
        <el-button type="primary" @click="change" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqRoleAdd, reqRoleDetail, reqRoleEdit } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    //取消，弹框消失
    cancel() {
      if (!this.info.isshow) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空数据
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //清空选项
      this.$refs.tree.setCheckedKeys([]);
    },
    //点击添加
    getCheckedKeys() {
      //设置选项
      let arr = this.$refs.tree.getCheckedKeys();
      this.user.menus = JSON.stringify(arr);
      reqRoleAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹框
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //清空数据
          this.empty();
          //刷新列表
          this.$emit("init");
        }
      });
    },
    //获取弹框内编辑
    getUser(id) {
      reqRoleDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.menus = JSON.parse(res.data.list.menus);
          //设置选项
          this.$refs.tree.setCheckedKeys(this.user.menus);
          this.user.id = id;
        }
      });
    },
    //更改数据
    change() {
      reqRoleEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹框
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //清空数据
          this.empty();
          //刷新列表
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>