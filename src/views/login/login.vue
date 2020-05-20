<template>
  <div class="login">
    <div class="login-img">
      <img class="logoimg" src="../../assets/images/logo@2x.png" alt />
      <img class="titleimg" src="../../assets/images/tittle@2x.png" alt />
    </div>
    <div class="login-con">
      <div class="form-con">
        <login-form @on-success-valid="handleSubmit"></login-form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/LoginForm";
import { mapActions } from "vuex";
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["handleLogin"]),
    handleSubmit({ userName, password }) {
      this.loading = true;
      this.handleLogin({ userName, password }).then(res => {
        this.loading = false;
        if (res.data && res.data.code === 0) {
          this.$router.push({
            name: this.$config.homeName
          });
        } else {
          this.$Message.error({
            content: (res.data && res.data.message) || "登录失败",
            duration: 2
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.login .ivu-input-wrapper {
  display: inline-block;
  width: 100%;
  position: relative;
  vertical-align: middle;
  line-height: normal;
  background: #fff;
}
.login .ivu-input-group .ivu-input {
  height: 48px;
  color: #0e1fa3;
  font-size: 14px;
}
.login .login-con .ivu-btn {
  height: 48px;
  background: #18178a;
  color: #ffffff;
}
</style>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/loginbg.png") no-repeat;
  background-size: cover;
  position: relative;
  &-img {
    padding: 153px 0 0px 300px;
    display: flex;
    align-items: center;
    .logoimg {
      height: 38px;
      width: auto;
      margin-right: 15px;
    }
    .titleimg {
      height: 30px;
      width: auto;
    }
  }
  &-con {
    position: absolute;
    right: 14%;
    top: 50%;
    transform: translateY(-42%);
    width: 22%;
    height: 42%;
    background: url("../../assets/images/login-form.png") no-repeat;
    background-size: 100% 100%;
    padding: 60px 45px;
    box-sizing: border-box;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
      .ivu-input-group {
        height: 48px;
      }
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
  @media only screen and (max-width: 1440px) {
    &-con {
      position: absolute;
      right: 14%;
      top: 50%;
      transform: translateY(-42%);
      width: 40%;
      height: 42%;
      background: url("../../assets/images/login-form.png") no-repeat;
      background-size: 100% 100%;
      padding: 60px 45px;
      box-sizing: border-box;
      &-header {
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }
      .form-con {
        padding: 10px 0 0;
        .ivu-input-group {
          height: 48px;
        }
      }
      .login-tip {
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }
}
</style>
