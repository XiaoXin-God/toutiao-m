<template>
  <div class="search-suggestion">
    <van-cell v-for="(item,index) in suggestions" :key="index" icon="search" :title="item">
      <div v-html="highlight(item)" slot="title" @click="$emit('search',item)"></div>
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
    };
  },
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText);
        this.suggestions = data.data.options;
      }, 500),
      immediate: true,
    },
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    highlight(item){
      return item.replace( new RegExp(this.searchText,'gi'),`<span style="color:red"> ${ this.searchText } </span>` )
    }
  },
};
</script>
<style scoped lang='less'>
</style>
