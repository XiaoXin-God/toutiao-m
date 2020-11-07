<template>
  <div class="login-container">
    <van-nav-bar
      title="登录/注册"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

    <van-form
      @submit="onLogin"
      ref="login-form"
      @failed="onFailed"
      validate-first
      :show-error-message="false"
      :show-error="false"
    >
      <van-field
        v-model="user.mobile"
        left-icon="phone-circle-o"
        placeholder="请输入手机号"
        conter
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="chat-o"
        placeholder="请输入验证码"
        conter
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            type="primary"
            @click.prevent="onSendSms"
            v-else
            :loading= "isSendSmsLoading"
          >
            发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "17090086870",
        code: "246810",
      },
      formRules: {
        mobile: [
          { required: true, message: "手机号必填" },
          {
            required: true,
            pattern: /^1[3|4|5|7|8][0-9]{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          { required: true, message: "验证码必填" },
          { required: true, pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    };
  },
  methods: {
    async onLogin() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      try {
        const res = await login(this.user);
        Toast.success("登录成功");
        this.$store.commit('setUser',res.data.data)

        this.$router.back()
      } catch (err) {
        Toast.fail("登录失败,用户名或密码错误");
      }
      // 处理响应结果
    },

    onFailed(error) {
      console.log("格式错误", error);
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: top,
        });
      }
    },

    async onSendSms() {
      try {
        let data = await this.$refs["login-form"].validate("mobile");
        this.isCountDownShow = true
      } catch (error) {
        this.$toast({
          message: error.message,
          position: top,
        });
      }


    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>