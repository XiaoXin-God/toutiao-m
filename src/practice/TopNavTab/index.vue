<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</template>
<script>
import list from "./list.js";

export default {
  name: "TopNavTab",
  components: {},
  props: {},
  data() {
    return {
      contentList: [],
      loading: false,
      finished: false,
      num:10, 
      pageNum:1
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      
      // 1 请求获取数据

      // 2 将数据放到数据列表中

      // 3 关闭本次的loading

      // 4 判断是否有数据
    },
  },
};
</script>
<style scoped lang='less'>
</style>
