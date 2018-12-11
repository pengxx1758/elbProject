<template>
  <div id="shopRegistBlock">
    <h1>亲，请填写您的注册信息</h1>
    <el-form
      :model="registerRuleForm"
      :rules="registerRules"
      ref="registerRuleForm"
      label-width="100px"  
    >
      <div class="fl">
        <!-- <h2>个人信息</h2> -->
        <el-form-item label="账号" prop="username">
          <el-input v-model="registerRuleForm.username" ></el-input>
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
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="registerRuleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input type="text" v-model="registerRuleForm.idCard"></el-input>
        </el-form-item>
      </div>
      <div class="fr">
        <!-- <h2>店铺信息</h2> -->
        <el-form-item label="店铺名称" prop="shopName">
          <el-input type="text" v-model="registerRuleForm.shopName"></el-input>
        </el-form-item>
        <el-form-item label="店铺类别" prop="shopType">
          <el-select v-model="registerRuleForm.shopType" placeholder="请选择">
            <el-option
              v-for="item in shopOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="店铺照片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="2"
            :on-exceed="handleExceed"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
            
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>-->
        <el-form-item label="上传图片">
          <!-- <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">身份证正反面、营业许可证等开店证明</div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>-->
          <input id="file_input" type="file"/>
        </el-form-item>
      </div>
    </el-form>
    <div class="clear">
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="toIndex">取 消</el-button>
        <el-button
          type="primary"
          @click="registerSubmitForm('registerRuleForm',registerRuleForm,1)"
        >提交审核</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import route from "../router";
export default {
  name: "shopRegist",
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
    let validateContact = function(rules, value, callback) {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else {
        // 中文或英文、数字正则
        let regExpr = /^[a-zA-Z0-9 \u4e00-\u9fa5]+$/;
        if (!regExpr.test(value)) {
          callback(new Error("非法姓名"));
        } else if (value && value.trim().length > 30) {
          callback(new Error("长度超出限制"));
        } else {
          callback();
        }
      }
    };
    return {
      // 注册表单
      registerRuleForm: {
        username: "",
        password: "",
        checkPass: "",
        tell: "",
        name: "",
        idCard: "",
        shopName: "",
        shopType: "美食"
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
        ],
        name: [{ validator: validateContact, trigger: "blur" }],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" }
        ],
        shopName: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },

      // 商店类别选项
      shopOptions: [
        {
          value: "美食",
          label: "美食"
        },
        {
          value: "便利",
          label: "便利"
        },
        {
          value: "水果",
          label: "水果"
        },
        {
          value: "药品",
          label: "药品"
        },
        {
          value: "甜食饮品",
          label: "甜食饮品"
        }
      ],

      // 上传图片
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ],

      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    registerSubmitForm(formName, data, sole) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(data);
          alert("submit!");
          if (sole == 1) {
            // 普通用户注册
            // let url = this.HOST + '/register'
            // this.$http.post(url,data)
            // .then(res => {
            //   console.log(res);
            // })
            // .catch(error => {
            //   console.log(error);
            // })
          } else {
            // 店铺注册
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toIndex() {
      route.push("/mainIndex");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 4 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      console.log(file);
      console.log(fileList);
      // this.fileList = fileList.slice(-3);
    }
  }
};
</script>

<style scoped>
#shopRegistBlock {
  width: 1000px;
  margin: 0 auto;
}

.fl {
  width: 50%;
  float: left;
}

.fr {
  width: 50%;
  float: right;
}

.clear {
  clear: both;
}

#file_input{
  background-color: none;
  border: 0;

}
</style>
