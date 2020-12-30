<template>
  <div>
    <el-dialog
      title="编辑角色"
      :visible.sync="info.isshow"
      @closed="info.isshow = false"
    >
      <el-form :model="user">
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
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
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="change">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqMemberDetail, reqMemberEdit } from "../../utils/http";
import { successalert, erroralert } from "../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    //点击添加
    get(uid) {
      reqMemberDetail({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.password = "";
        }
      });
    },
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.nickname === "") {
          erroralert("昵称不能为空");
          return;
        }
        if (this.user.phone === "") {
          erroralert("手机号不能为空");
          return;
        }
        if (this.user.password === "") {
          erroralert("密码不能为空");
          return;
        }
        resolve();
      });
    },
    //更改数据
    change() {
      this.checkProps().then(() => {
        reqMemberEdit(this.user).then((res) => {
          if (res.data.code == 200) {
            //弹框
            successalert(res.data.msg);
            //弹框消失
            this.info.isshow = false;
            //刷新列表
            this.$emit("init");
          }
        });
      });
    },
  },
};
</script>

<style>
</style>