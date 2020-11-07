<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isPullDownLoading"
      @refresh="onRefresh"
      :success-text="refresfSuccessText"
      success-duration="2000"
      :animation-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articles"
          :key="index"
          :title="item.title"
        /> -->
        <ArticleItem
          v-for="(item, index) in articles"
          :key="index"
          :article="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      isPullDownLoading: false, //下拉刷新的loading事件
      refresfSuccessText: "",
      timestamp: null, //获取下一页默认数据的时间戳
    };
  },
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        // 1 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(), //传递data中timestamp的时间戳，如果没有则表示是第一次请求，否则就去请求最新的时间戳
          with_top: 1,
        });
        const { results } = data.data;
        this.articles.push(...results);
        this.loading = false;
        // 判断还有没有下一页数据（根据results的长度判断）如果有下一页数据就继续加载，没有则提示没有下一页数据数据

        if (results.length) {
          // 说明还有下一页数据
          this.timestamp = data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async onRefresh() {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      const { results } = data.data;
      this.articles.unshift(...results);
      this.refresfSuccessText = `更新了${results.length}条数据`;
      this.isPullDownLoading = false;
    },
  },
};
</script>

<style lang="less">
.article-list {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
</style>