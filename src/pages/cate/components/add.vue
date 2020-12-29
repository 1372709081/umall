<template>
  <div>
    <el-dialog
      :title="info.show ? '添加分类' : '编辑分类'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option :value="0" label="顶级分类"> </el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="100px" v-if="user.pid !== 0">
          <div class="upload">
            <h3>+</h3>
            <img v-if="imgUrl" :src="imgUrl" alt />
            <input
              v-if="info.isshow"
              type="file"
              @change="changeImg"
            />
          </div>
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
import { reqCateAdd, reqCateDetail, reqCateEdit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
import path from "path";
export default {
  props: ["info", "list"],
  data() {
    return {
      //初始化数据
      user: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
      //初始化图片地址
      imgUrl: "",
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
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    //上传文件
    changeImg(prc) {
      //文件信息
      let file = prc.target.files[0];
      //后缀名
      let extname = path.extname(file.name);
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some((item) => item === extname)) {
        erroralert("请上传图片");
        return;
      }
      // 将文件生成一个url地址
      this.imgUrl = URL.createObjectURL(file);
      //赋值
      this.user.img = file;
    },
    add() {
      reqCateAdd(this.user).then((res) => {
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
    get(id) {
      reqCateDetail({ id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
          //处理图片
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    updata() {
      reqCateEdit(this.user).then((res) => {
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

<style scoped>
.upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
  font-size: 14px;
}

.upload h3 {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100px;
  color: #606266;
}

.upload input {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

.upload img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>