<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell center class="base-info" :border="false">
        <van-image
          class="avatar"
          slot="icon"
          :src="currentUser.photo"
          round
          cover
        ></van-image>
        <div slot="title" class="name">{{ currentUser.name }}</div>
        <van-button type="primary" size="small" round class="updata-btn"
          >编辑资料</van-button
        >
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="count">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="count">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="count">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="not-login" v-else>
      <div class="mobile" @click="$router.push('/login')"></div>
      <div class="text">登录 / 注册</div>
    </div>

    <van-grid class="nav-grid mr-5" :column-num="2">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item
        class="nav-grid-item"
        icon="browsing-history-o"
        text="历史"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="" />
    <van-cell class="mr-5" title="小智同学" is-link to="" />
    <van-cell
      class="logout-cell"
      v-if="user"
      @click="onLogout"
      title="退出登录"
    />
  </div>
</template>

<script>
import Vue from "vue";

import { mapState } from "vuex";
import { Dialog } from "vant";
import { getCurrentUser } from "@/api/user";
// 全局注册
Vue.use(Dialog);
export default {
  data() {
    return {
      // 用户当前登录信息
      currentUser: {},
    };
  },

  created() {
    this.loadCurrentUser();
  },

  methods: {
    onLogout() {
      // 提示用户确认退出 ，如果确认就退出 ，取消就留在当前页面
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "确认退出吗",
        })
        .then(() => {
          // console.log('退出登录')
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // console.log('取消退出登录')
        });
    },

    async loadCurrentUser() {
      const { data } = await getCurrentUser();
      this.currentUser = data.data;
    },
  },

  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background-color: rgba(79, 106, 196, 0.623);
    .base-info {
      height: 115px;
      box-sizing: border-box;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        width: 66px;
        height: 66px;
        border: 1px solid #ffffff;
        box-sizing: border-box;
        margin-right: 11px;
      }
      .name {
        color: #ffffff;
        font-size: 15px;
      }
      .updata-btn {
        // width: 58px;
        height: 20px;
        font-size: 10px;
        color: #666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #ffffff;
        .text-warp {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 12px;
          }
        }
      }
    }

    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 180px;
    background-color: rgba(79, 106, 196, 0.623);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
      background-color: #fff;
      border-radius: 50%;
    }
    .text {
      color: #ffffff;
      font-size: 14px;
      padding-top: 10px;
    }
  }
  .nav-grid {
    height: 70px;
    .nav-grid-item {
      height: 100%;
      /deep/ .van-grid-item__icon {
        font-size: 22px;
      }
      /deep/ .van-icon-star-o {
        color: #eb5253;
      }
      /deep/ .van-icon-browsing-history-o {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mr-5 {
    margin-bottom: 5px;
  }
}
</style>>