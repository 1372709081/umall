<template>
  <div>
    <div id="main"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList"
    })
  },
  mounted() {
    //发请求
    this.reqList();
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          let mychart = require("echarts").init(
            document.getElementById("main")
          );
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: ""
            },
            tooltip: {},
            legend: {
              data: []
            },
            xAxis: {
              data:this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [
              {
                name: "分类数量",
                type: "line",
                data: this.list.map(item=>item.children?item.children.length:0)
              },
            ]
          };

          mychart.setOption(option);
        }
      },
      deep: true
    }
  }
};
</script>
<style scoped>
#main {
  width: 80%;
  height: 500px;
  margin: 20px auto;
}
</style>