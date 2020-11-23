<template>
  <div class="search-suggestion">
    <van-cell 
      v-for="(str,index) in suggestions" 
      :key="index" icon="search" 
      :title="str">
      <div v-html="highlight(str)" slot="title" @click="$emit('search',str)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [], //联想建议数据列表
      htmlStr: 'Hello <span style="color:red">World</span>'
    };
  },
  watch: {
    searchText: {
      // debounce函数
      // 参数一： 函数
      // 参数二:  时间
      // 返回值:  防抖处理的函数
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText);
        this.suggestions = data.data.options;
      }, 500),
      immediate: true, //该回调将会在监听开始之后被立即调用
    },
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    highlight(str){
      return str.replace( 
        new RegExp(this.searchText,'gi'),
        `<span style="color:red"> ${ this.searchText } </span>` 
      )
    }
  },
};
</script>
<style scoped lang='less'>
</style>
