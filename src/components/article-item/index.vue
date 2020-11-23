<template>
  <van-cell
   class="article-item"
   :to="{
     name: 'article',
     params: {
       articleId: article.art_id
     }
   }"
  >
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.title }}
    </div>
    <div slot="label">
      <div class="cover-warp" v-if="article.cover.type === 3">
        <div
          class="cover-warp-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item" height="73" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-warp">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }} 条评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      width="116"
      height="73"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
  }
  .cover-warp {
    padding: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .cover-warp-item {
      flex: 1;
      height: 73px;
      box-sizing: border-box;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-warp {
      font-size: 11px;
      color: #b4b4b4;

      span{
          margin-right: 12px;
      }
  }
}
</style>