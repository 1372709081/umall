<template>
  <div>
    <el-dialog
      :title="info.show ? '添加管理员' : '编辑管理员'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="user.roleid">
            <el-option :value="0" label="--请选择--" disabled> </el-option>
            <el-option
              v-for="item in List"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" show-password></el-input>
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
        <el-button type="primary" @click="add" v-if="info.show"
          >添 加</el-button
        >
        <el-button type="primary" @click="change" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqUserAdd, reqUserDetail, reqUserEdit } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "List", "idArr"],
  data() {
    return {
      user: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
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
        uid: 0,
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    add() {
      reqUserAdd(this.user).then((res) => {
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
    User(uid) {
      reqUserDetail({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.uid = uid;
          let arr = this.idArr.findIndex((arr) => arr == this.user.roleid);
          if (arr) {
            this.user.roleid = 0;
          }
          this.user.password = ""
        }
      });
    },
    //修改更新数据
    change() {
      reqUserEdit(this.user).then((res) => {
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