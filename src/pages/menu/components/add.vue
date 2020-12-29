<template>
  <div>
    <el-dialog
      :title="info.show ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" @change="Change">
            <el-option :value="0" label="顶级菜单"> </el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.title"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="100px">
          <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          label-width="100px"
          v-if="user.type == 1"
        >
          <el-select v-model="user.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="100px" v-else>
          <el-select v-model="user.url">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :value="'/' + item.path"
              :label="item.name + ' -- /' + item.path"
            ></el-option>
          </el-select>
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
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入路由集合
import { indexRoutes } from "../../../router";
import { reqMenuAdd, reqMenuDetail, reqMenuEdit } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      //初始化数据
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      //所有图标
      icons: [
        "el-icon-delete",
        "el-icon-setting",
        "el-icon-user",
        "el-icon-s-goods",
        "el-icon-star-on",
      ],
      //路由集合
      indexRoutes,
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
    //清空表单数据
    empty() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    add() {
      reqMenuAdd(this.user).then((res) => {
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
    Change() {
      this.user.type = this.user.pid == 0 ? 1 : 2;
    },
    get(id) {
      reqMenuDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
        }
      });
    },
    updata() {
      reqMenuEdit(this.user).then((res) => {
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