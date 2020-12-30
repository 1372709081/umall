<template>
  <div class="box" @keyup.enter="login">
    <div class="con">
      <h3 class="tit magb">登录</h3>
      <el-form :model="user">
        <el-input
          class="magb"
          v-model="user.username"
          placeholder="请输入用户名"
          clearable
        ></el-input>
        <el-input
          class="magb"
          v-model="user.password"
          placeholder="请输入密码"
          clearable
          show-password
        ></el-input>
        <el-button class="btn" type="primary" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "../../utils/http";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    //登录
    login() {
      reqLogin(this.user).then((res) => {
        if (res.data.code === 200) {
          this.changeUser(res.data.list);
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563444, #2f3d60);
}
.con {
  width: 400px;
  background: #ffffff;
  padding: 50px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
}
.tit {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  line-height: 30px;
}
.btn {
  width: 100%;
}
.magb {
  margin-bottom: 20px;
}
</style>