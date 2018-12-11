<template>
    <div id="registerBlock">
        <h1>亲，请填写您的注册信息</h1>
        <el-form :model="registerRuleForm" :rules="registerRules" ref="registerRuleForm" label-width="100px">
            <el-form-item label="账号" prop="username">
                <el-input v-model="registerRuleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerRuleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="registerRuleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tell">
                <el-input type="text" v-model="registerRuleForm.tell"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="returnToLogin">返 回</el-button>
                <el-button type="primary" @click="registerSubmitForm('registerRuleForm',registerRuleForm,1)">注 册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import router from "../router";
export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerRuleForm.checkPass !== "") {
          this.$refs.registerRuleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerRuleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 注册表单
      registerRuleForm: {
        username: "",
        password: "",
        checkPass: "",
        tell: "",
        shopType: ""
      },

      registerRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        tell: [
          { required: true, message: "手机号不能为空" },
          { pattern: /^1[34578]\d{9}$/, message: "请输入正确的手机格式" }
        ]
      }
    };
  },
  methods: {
    registerSubmitForm(formName, data, sole) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(data);
          if (sole == 1) {
            //普通用户注册
            let url = this.HOST + '/register'
            this.$http.get(url,{
              params:{
                username: data.username,
                password: data.password,
                tell: data.tell
              }
            })
            .then(res => {
              console.log(res);
              if(res.data.status == "0"){
                this.$message({
                  type: 'success',
                  message: res.data.message
                });
                router.push('/login');
              }else{
                this.$message.error(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            })
          } else {
            // 店铺注册
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    returnToLogin(){
        router.push('/login');
    }
  }
};
</script>

<style>
#registerBlock {
  width: 500px;
  margin: 0 auto;
}
</style>