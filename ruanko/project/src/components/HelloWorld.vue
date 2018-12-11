<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <el-upload
      class="avatar-uploader"
      action="/idea/uploadImage"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>-->
    <el-form :model="testForm">
      <el-form-item></el-form-item>
      <el-input v-model="testForm.testfile" type="file"></el-input>
    </el-form>
    <el-button type="primary" @click="testSubmit(testForm)">测试</el-button>
    <input
      ref="file"
      type="file"
      id="file"
      accept="image/png, image/gif, image/jpeg"
      @change="update"
    >

    <el-button type="success" @click="postTest">POST测试</el-button>
  </div>
</template>

<script>
import qs from "qs";
// import zizujian from "zizujian";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      imageUrl: "",
      testForm: {
        testfile: ""
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("url:" + this.imageUrl);
      // get
      // let url = "/idea/uploadImage"
      // this.$http.post(url,{
      //   imageFile: file
      // })
      // .then(res =>{
      //   console.log(res);
      // })
      // .catch(error =>{
      //   console.log(error);
      // })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    testSubmit(data) {
      // console.log(data);
      var test = this.$refs.file;
      console.log(test.files[0]);
    },
    update(e) {
      let file = e.target.files[0];
      console.log(file);
      let param = new FormData(); //创建form对象
      param.append("file", file, file.name); //通过append向form对象添加数据

      // let config = {
      //   headers: { "Content-Type": "multipart/form-data" }
      // }; //添加请求头
      let url = "/idea/uploadImage";
      this.$http
        .post(url, {
          imageFile: 111
        })
        .then(res => {
          console.log(res);
        });
    },
    postTest() {
      let url = "/idea/test";
      let data = new FormData();
      data.append("test", "FD进去的数据");

      // var params = new URLSearchParams();
      // params.append("test","URL进去的数据")

      let qsDate = qs.stringify({
        test: "qs进去的数据",
        file: [1,2,3,4]
      },{indices: false})

      this.$http
        .post(url, qsDate)
        .then(res => {
          console.log(res);
        });
    }
  },
  created() {
    // 百度地图api调用
    // myapi.getLocationByName('湛江','广东海洋大学');
    // let url = '/mapapi/geocoder'
    // this.$http.get(url,{
    //   params:{
    //     city: '湛江',
    //     address: '广东海洋大学',
    //     output: 'json',
    //     key: 'MPz0YWb32SRcAbWPGE5CI8TBIOwjtAFF',
    //   }
    // })
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
    // let url = "/idea/login";
    // this.$http
    //   .get(url, {
    //     params: {
    //       username: "11111",
    //       password: "222222",
    //       role: 0
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  },
  components: {
    // zizujian
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
