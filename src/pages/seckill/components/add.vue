<template>
  <el-dialog
    :title="info.show ? '添加秒杀' : '编辑秒杀'"
    :visible.sync="info.isshow"
    @closed="cancel"
  >
    <el-form :model="user">
      <el-form-item label="活动名称" label-width="100px">
        <el-input v-model="user.title"></el-input>
      </el-form-item>
      <el-form-item label="活动期限" label-width="100px">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="一级分类" label-width="100px">
        <el-select v-model="user.first_cateid" @change="changeFirstCateId">
          <el-option label="--请选择--" value disabled></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" label-width="100px">
        <el-select v-model="user.second_cateid" @change="changeSecondCateId">
          <el-option label="--请选择--" value disabled></el-option>
          <el-option
            v-for="item in secondCateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品" label-width="100px">
        <el-select v-model="user.goodsid">
          <el-option label="--请选择--" value disabled></el-option>
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.goodsname"
            :value="item.id"
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
      <el-button type="primary" @click="add" v-if="info.show">添 加</el-button>
      <el-button type="primary" @click="update" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {
  reqCateList,
  reqGoodsList,
  reqSeckAdd,
  reqSeckDetail,
  reqSeckEdit,
  reqSeckList,
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      //二级分类的列表
      secondCateList: [],
      //商品列表
      shopList: [],
      //时间
      time: [],
    };
  },
  computed: {
    ...mapGetters({
      //分类的list
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      //分类列表
      reqCateList: "cate/reqList",
      reqList: "seckill/reqList",
    }),
    //修改了一级分类
    changeFirstCateId() {
      //二级分类选中的清除
      this.user.second_cateid = "";
      //商品分类选中的清除
      this.user.goodsid = "";
      this.getSecondList();
    },
    //根据一级分类，计算出二级分类的list
    getSecondList() {
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    //修改了二级分类
    changeSecondCateId() {
      //商品分类选中的清除
      this.user.goodsid = "";
      this.getShopsList();
    },
    //根据二级分类找到所有商品
    getShopsList() {
      reqGoodsList({ id: this.user.second_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.shopList = res.data.list;
        }
      });
    },

    //取消
    cancel() {
      if (!this.info.show) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.time = [];
    },
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.title === "") {
          erroralert("活动名称不能为空");
          return;
        }
        if (this.time.length < 1) {
          erroralert("请选择活动期限");
          return;
        }
        if (this.user.first_cateid === "") {
          erroralert("请选择一级分类");
          return;
        }
        if (this.user.second_cateid === "") {
          erroralert("请选择二级分类");
          return;
        }
        if (this.user.goodsid === "") {
          erroralert("请选择商品");
          return;
        }
        resolve();
      });
    },
    //添加
    add() {
      this.checkProps().then(() => {
        this.user.begintime = new Date(this.time[0]).getTime();
        this.user.endtime = new Date(this.time[1]).getTime();
        reqSeckAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            this.empty();
            this.cancel();
            successalert(res.data.msg);
            this.reqList();
          }
        });
      });
    },
    //获取详情
    get(id) {
      reqSeckDetail({ id }).then((res) => {
        this.user = res.data.list;
        this.user.id = id;
        this.time = [
          new Date(parseFloat(this.user.begintime)),
          new Date(parseFloat(this.user.endtime)),
        ];
        this.getSecondList();
        this.getShopsList();
      });
    },
    //修改
    update() {
      this.checkProps().then(() => {
        reqSeckList(this.user).then((res) => {
          if (res.data.code == 200) {
            //1.弹框消失
            this.cancel();
            //2.数据清空
            this.empty();
            //3.弹成功
            successalert(res.data.msg);
            //4.刷新list
            this.reqList();
          }
        });
      });
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateList();
    }
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