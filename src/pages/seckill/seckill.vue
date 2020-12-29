<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"
export default {
  components:{vList,vAdd},
  data() {
    return {
      info:{
        isshow:false,
        show:true
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "seckill/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "seckill/reqList"
    }),
    //点了添加
    add(){
      this.info.isshow=true;
      this.info.show=true
    },
    //编辑
    edit(id){
      this.info.isshow=true;
      this.info.show=false 
      this.$refs.add.get(id)
    }
  },
};
</script>

<style>
</style>