<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="$router.back()"
        @focus="isResultShow=false"
      />
    </form>

    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :search-text="searchText" />

    <!-- 联想建议 -->
    <SearchSuggestion v-else-if="searchText" :search-text="searchText" @search="onSearch" />

    <!-- 历史记录 -->
    <SearchHistory v-else :search-histories="searchHistories" />
  </div>
</template>
<script>
import SearchSuggestion from "./components/search-suggestion";
import SearchHistory from "./components/search-history";
import SearchResult from "./components/search-result";

export default {
  name: "SearchIndex",
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult,
  },
  props: {},
  data() {
    return {
      searchText: "", //搜索输入框的内容
      isResultShow: false,
      searchHistories: [],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onSearch(searchText) {
      // 把输入框设置为你要搜索的文本
      this.searchText = searchText;
      const index = this.searchHistories.indexOf(searchText);
      if (index !== -1) {
        // 把重复项删除
        this.searchHistories.splice(index, 1);
      }
      // 把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchText);
      // 如果用户已登录，则把搜索历史记录存储到线上
      //    提示：只要我们调用获取搜索结果的数据接口，后端会给我们自动存储用户的搜索历史记录
      // 如果没有登录页，则把搜索历史记录存储到本地
      // setItem('search-histories', this.searchHistories)
      // 展示搜索结果
      this.isResultShow = true;
    },
  },
};
</script>
<style scoped lang='less'>
</style>

