<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>
<script>
import { getSearchResult } from "@/api/search";

export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 1 请求获取数据
      const { data } = await getSearchResult({
        page: this.page, //页码
        per_page: this.perPage, //每页多少条数据
        q: this.searchText,
      });
      // 2 将数据放到数据列表中
      const { results } = data.data;
      this.list.push(...results);
      // 3 关闭本次的loading
      this.loading = false;
      // 4 判断是否有数据
      //如果有，则更新获取下一页页码
      if (results.length) {
        this.page++;
        //如果没有， 则把 finished 设置为true，关闭加载更多
      } else {
        this.finished = true;
      }
    },
  },
};
</script>
<style scoped lang='less'>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 54px;
  overflow-y: auto;
}
</style>
