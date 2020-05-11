<template>
  <Form
    ref="loginForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
    class="clogin"
  >
    <FormItem prop="userName">
      <Input v-model="form.userName" size="large" placeholder="请输入用户名">
        <Icon type="md-person" :size="24" color="#0E1FA3" slot="prefix" />
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" size="large" v-model="form.password" placeholder="请输入密码">
        <Icon type="ios-lock" :size="24" color="#0E1FA3" slot="prefix" />
      </Input>
    </FormItem>
    <FormItem prop="code" style="display: flex;">
      <div>
           <Input v-model="form.code" size="large" placeholder="请输入验证码" />
      </div>
      <div class="login-code" @click="refreshCode">
        <!--验证码组件-->
        <v-sidentify :identifyCode="form.identifyCode"></v-sidentify>
      </div>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import SIdentify from "../VSidentify"; //**引入验证码组件**
export default {
  name: "LoginForm",
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      }
    },
    vsidentityRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "验证码不能为空", trigger: "blur" }];
      }
    }
  },
  data() {
    return {
      form: {
        userName: "测试用户1",
        password: "",
        identifyCode: "",
        code: ''
      },
      identifyCodes: "ABCDEFGHJKMNPQRSTWXYZ0123456789"
    };
  },
  components: {
    "v-sidentify": SIdentify
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        code:this.vsidentityRules,
      };
    }
  },
  mounted() {
    this.form.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if(this.form.code!==this.form.identifyCode){
            this.$Message.error('验证码错误');
            return false;
          }
          this.$emit("on-success-valid", {
            userName: this.form.userName,
            password: this.form.password
          });
        }
      });
    },
    //验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.form.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.form.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.form.identifyCode);
    }
  }
};
</script>
<style lang="less">
.ivu-form-item-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.clogin .ivu-form-item-content .ivu-input-prefix {
  color: #0e1fa3;
}
.clogin .ivu-input {
  color: #0e1fa3;
}
</style>
<style lang="less" scoped>
/*验证码样式*/
.code {
  width: 164px;
  height: 48px;
  padding-left: 15px;
  border: 1px solid rgba(186, 186, 186, 1);
}
.login-code {
  cursor: pointer;
}
</style>