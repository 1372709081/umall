<template>
  <div>
    <el-dialog
      :title="info.show ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="imgs">
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="imgs.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <div class="upload">
            <h3>+</h3>
            <img v-if="imgUrl" :src="imgUrl" alt />
            <input v-if="info.isshow" type="file" @change="changeImg" />
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="imgs.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="add" type="primary" v-if="info.show"
          >添 加</el-button
        >
        <el-button type="primary" @click="change" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqBannerAdd,reqBannerDetail,reqBannerEdit } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      imgs: {
        title: "",
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
    //清空数据
    empty() {
      this.imgs = {
        title: "",
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
      this.imgs.img = file;
    },
    //点击添加
    add() {
      reqBannerAdd(this.imgs).then((res) => {
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
      reqBannerDetail({ id }).then((res) => {
        if (res.data.code == 200) {
          this.imgs = res.data.list;
          //补id
          this.imgs.id = id;
          //处理图片
          this.imgUrl = this.$pre + this.imgs.img;
        }
      });
    },
    //更改数据
    change() {
      reqBannerEdit(this.imgs).then((res) => {
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