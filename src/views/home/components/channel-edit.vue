<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        type="danger"
        size="mini"
        plain
        round
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: active === index }"
        :icon="isEdit && index !== 0 ? 'cross' : ''"
        v-for="(item, index) in userChannels"
        :key="index"
        :text="item.name"
        @click="onUserChannelClick(index)"
      />
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道列表</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(allChannel, index) in recommendChannels"
        :key="index"
        :text="allChannel.name"
        @click="onAdd(allChannel)"
      />
    </van-grid>
  </div>
</template>
<script>
import { getAllChannels, addUserChannel } from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // 获取所有频道数据
      allChannels: [],
      isEdit: false, //控制我的频道图标显示隐藏
      activeIndex: 0,
    };
  },
  created() {
    this.loadAllChannels();
  },
  computed: {
    ...mapState(["user"]),

    recommendChannels() {
      // filter方法过滤数组，根据方法返回的布尔值true来收集数据
      return this.allChannels.filter((channel) => {
        // 判断channles是否属于用户频道
        return !this.userChannels.find((userChannel) => {
          return userChannel.id === channel.id; //找到满足该条件的元素
        });
      });
    },
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels();
      this.allChannels = data.data.channels;
    },

    async onAdd(channel) {
      this.userChannels.push(channel);
      if (this.user) {
        // 登录了  数据储存到线上
        await addUserChannel({
          channels: [{ id: channel.id, seq: this.userChannels.length }],
        });
      } else {
        // 没有登录  数据储存到本地
        // console.log('本地')
        setItem("user-channles", this.userChannels);
      }
    },

    onUserChannelClick(index) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(index);
      } else {
        this.switchChannel(index);
      }
    },

    deleteChannel(index) {
      this.$emit("update-active", this.active - 1);
      this.userChannels.splice(index, 1);

      if (this.user) {
        // 登录状态下
      } else {
        // 退出登录状态下
        setItem("user-channles",this.userChannels)
      }
    },
    switchChannel(index) {
      this.activeIndex = index;
      this.$emit("update-active", index);
      this.$emit("close");
    },
  },
};
</script>
<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;

  .channel-title {
    font-size: 16px;
    color: #333333;
  }
  .van-button {
    width: 40px;
    height: 20px !important;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/.van-icon {
      position: absolute;
      top: -7px;
      right: -7px;
      font-size: 14px;
      border: 1px solid #000;
      border-radius: 50%;
    }

    /deep/.van-grid-item__content {
      background-color: #f4f5f6;

      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: rgb(233, 52, 52) !important;
    }
  }
  .grid-item-icon {
    position: relative;
    .van-icon {
      position: absolute;
      top: -7px;
      right: -7px;
      font-size: 14px;
      border: 1px solid #000;
      border-radius: 50%;
    }
  }
}
</style>