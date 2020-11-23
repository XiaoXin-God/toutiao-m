<template>
  <div class="article-container">
    <!-- 导航栏开始 -->
    <van-nav-bar class="app-nav-bar" title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 导航栏结束 -->

    <h1 class="title">牛逼程序员都用的开源工具, 你用了几个?</h1>
    <van-cell center class="user-info">
      <div slot="title" class="name">天涯小型客</div>
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div slot="label" class="pubdate">14小时前</div>
      <van-button class="follow-btn" type="info" icon="plus" round size="small">关注</van-button>
    </van-cell>
    <div class="markdown-body">
      <p>hello</p>
      <p>world</p>
      <a href>dsadsa</a>
      <ul>
        <li>dnsa</li>
        <li>dnsa</li>
        <li>dnsa</li>
        <li>dnsa</li>
      </ul>
    </div>
  </div>
</template>
<script>
import "./github-markdown.css";
import { getArticleById } from "@/api/article";

export default {
  name: "ArticleIndex",
  components: {},
  // 在组件中获取动态路由参数
  //  方式一: this.$route.params.articleId
  //  方式二: props 传参, 推荐
  //    this.articleId
  props: {
    articleId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    this.loadArticle();
  },
  mounted() {},
  methods: {
    async loadArticle () {
      console.log(this.articleId)
      const { data } = await getArticleById(this.articleId)
      console.log(data)
    }
  }
};
</script>
<style scoped lang='less'>
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 24px 20px 18px;
  background-color: #fff;
  margin: 0;
}
.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
  ul {
    list-style: unset;
  }

  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
}
</style>
