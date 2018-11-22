<template>
  
  <div id="app">
    <el-container>
      <el-header>
          <div id="login" style="float:right;">
            <el-button type="text" @click="loginDialogVisible = true">登录</el-button>
          </div>

          <!-- 登录弹出框开始 -->
            <el-dialog
              title="登录界面"
              :visible.sync="loginDialogVisible"
              width="40%"
              :before-close="handleClose">
              <el-form :model="loginRuleForm" :rules="loginRules" ref="loginRuleForm" label-width="100px">
                <el-form-item label="账号" prop="name">
                  <el-input v-model="loginRuleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="loginRuleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="registerDialogVisible=true,loginDialogVisible=false">注 册</el-button>
                <el-button type="primary" @click="submitForm('loginRuleForm')">登 录</el-button>
              </span>
            </el-dialog>
          <!-- 登录弹出框结束 -->
          <!-- 注册弹出框开始 -->
          <el-dialog
              title="注册界面"
              :visible.sync="registerDialogVisible"
              width="40%"
              :before-close="handleClose">
              <el-form :model="registerRuleForm" :rules="registerRules" ref="registerRuleForm" label-width="100px">
                <el-form-item label="账号" prop="name">
                  <el-input v-model="registerRuleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="registerRuleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="registerDialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="submitForm('registerRuleForm')">注 册</el-button>
              </span>
            </el-dialog>
            <!-- 注册弹出框结束 -->

        
      </el-header>
      <el-container>
        <el-aside>
          <el-menu router="true" :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">个人中心</el-menu-item>
            <el-menu-item index="/home">Home</el-menu-item>
            <el-menu-item index="/HelloWorld">HelloWorld</el-menu-item>
          </el-menu>
        </el-aside> 
        <el-main>
          <router-view/>  
        </el-main>
      </el-container> 
    </el-container>


    
  </div>  
  
</template>

<script>
export default {
  name: 'App',
  data() {
      return {
        // 菜单默认项
        activeIndex: '1',
        // 登录弹框
        loginDialogVisible: false,
        registerDialogVisible: false,
        // 登录表单
        loginRuleForm: {
          name: '',
          pass: ''
        },
        loginRules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          pass:[
            { required: true, message: '请输入密码',trigger: 'blur'},
            { min:6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ]
        },
        // 注册表单
        registerRuleForm:{
          name: '',
          pass: '',
          checkpass: ''
        },
        registerRules:{
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          pass:[
            { required: true, message: '请输入密码',trigger: 'blur'},
            { min:6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ]
        }

      };
    },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  /* 登录注册块 */
  #login{
    float: right;
  }
  #login > button{
      margin: 0 10px;
  }

  
  
</style>
