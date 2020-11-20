<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        size="small"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <van-tabs v-model="active">
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="wap-nav-zhanwei"></div>
      <div
        slot="nav-right"
        @click="isChannelEditShow = true"
        class="wap-nav-wrap"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup
      class="channel-edit-popup"
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      get-container="body"
    >
      <ChannelEdit
        :userChannels="channels"
        @close="isChannelEditShow = false"
        @update-active="active = $event"
        :active="active"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/article-list";
import ChannelEdit from "./components/channel-edit";
import { mapState } from "vuex"
import { getItem } from "@/utils/storage";

export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      // tab频道列表
      channels: [],
      isChannelEditShow: false,
    };
  },
  computed:{
    ...mapState(["user"])
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      let channels = []
      if(this.user){
        // 已登录，请求获取线上的用户频道列表
        const { data } = await getUserChannels()
        channels = data.data.channels
      }else{
        // 没有登录，判断是否有本地存储的频道列表数据
        const localChannels = getItem('user-channels')

        // 如果本地有存储的数据则使用，
        if(localChannels){
          channels = localChannels
        } else {
          // 用户没有登录，也没有本地存储的频道，那就请求获取默认的频道列表
          const { data } = await getUserChannels();
          channels = data.data.channels
        }
      }
      this.channels = channels
      // this.channels = data.data.channels;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    .van-button__text {
      font-size: 14px;
    }
    .van-icon {
      font-size: 16px;
      vertical-align: middle;
    }
  }
  /deep/ .van-tab {
    border-right: 1px solid rgb(245, 239, 239);
    border-bottom: 1px solid rgb(245, 239, 239);
    width: 28%;
  }
  /deep/ .van-tabs__line {
    width: 24px;
    height: 4px;
    bottom: 20px;
    background-color: #5babfb;
  }
  .wap-nav-wrap {
    height: 43px;
    width: 33px;
    text-align: center;
    border-left: 1px solid rgb(245, 239, 239);
    position: fixed;
    right: 0;
    line-height: 43px;
    background-color: rgb(255, 255, 255);
    opacity: 0.9;
  }
  .wap-nav-zhanwei {
    flex-shrink: 0;
    width: 33px;
    height: 43px;
    border-bottom: 1px solid rgb(245, 239, 239);
  }
}
.channel-edit-popup {
  height: 100%;
}
</style>