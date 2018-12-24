<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-upload
      class="avatar-uploader"
      action="/idea/test"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-form :model="testForm">
      <el-form-item></el-form-item>
      <el-input v-model="testForm.testfile" type="file"></el-input>
    </el-form>
    <el-button type="primary" @click="testSubmit(testForm)">测试</el-button>

    <input ref="file" type="file" id="file" @change="update">

    <el-button type="success" @click="postTest">POST测试</el-button>
    <br>
    <br>
    <el-upload
      name="file1"
      action="idea/test"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>

    <br>
    <br>

    <el-button type="success" @click="postList">Post_List测试</el-button>
  </div>
</template>

<script>
import qs from "qs";
// import zizujian from "zizujian";
import axios from "axios";
export default {
  name: "HelloWorld",
  created() {},
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      imageUrl: "",
      testForm: {
        testfile: ""
      },
      dialogImageUrl: "",
      file1: '',
      dialogVisible: false
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    testSubmit(data) {
      // console.log(data);
      var test = this.$refs.file;
      console.log(test.files[0]);
    },

    update(e) {
      let file = this.$refs.file.files[0];
      // console.log(file);
      let param = new FormData(); //创建form对象
      param.append("file1", file); //通过append向form对象添加数据
      console.log(param.get("file"));

      let qsDate = qs.stringify(
        {
          imageFile: file
        },
        { indices: false }
      );

      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头

      let url = "/idea/test";
      // this.$http
      //   .post(url,param)
      //   .then(res => {
      //     console.log(res);
      //   });
      // let instance= axios.create({withCredentials:true})
      this.$http.post(url, param).then(res => console.log(res));
    },

    postTest() {
      let url = "/idea/test";
      // let file = e.target.files[0];
      let data = new FormData();
      data.append("file", "file");

      // var params = new URLSearchParams();
      // params.append("test","URL进去的数据")
      // var file = new File([], "test");

      let qsDate = qs.stringify(
        {
          test: "qs进去的数据",
          file: [1, 2, 3, 4]
        },
        { indices: false }
      );
      // let config = {
      //   data: FormData,
      //   headers: { "Content-Type": "multipart/form-data" }
      // }; //添加请求头
      this.$http.post(url, data).then(res => {
        console.log(res);
      });
    },
    postList() {
      // let array = [1,2,3,4];
      // let url = "/idea/test1";

      // this.$http.post(url,JSON.stringify(array))
      // .then(res => {
      //   console.log(res);
      // })
      let data = new FormData();
      var orderitems = [
        {
          pid: 2,
          numbers: 50,
          uid: 1,
          price: 20,
          photo_addr: "111",
          status1: 0
        },
        {
          pid: 2,
          numbers: 50,
          uid: 1,
          price: 21,
          photo_addr: "111",
          status1: 0
        }
      ];
      data.append("orderitems",JSON.stringify(orderitems));
      data.append("total_price", 200);
      data.append("mid", 2);
      data.append("addr", "1111");
      data.append("uid", "22");
      // sessionStorage.setItem("username", "pxx");
      // console.log(sessionStorage.getItem("username"));
      // console.log(111);
      // sessionStorage.setItem("items",JSON.stringify([
      //   {
      //     id: 1,
      //     message: "1111"
      //   },
      //   {
      //     id: 2,
      //     message: "2222"
      //   }
      // ]))
      // console.log(sessionStorage['items']);
      // console.log(sessionStorage);
      // const data = {
      //   orderitems: [
      //     {
      //       pid: 2,
      //       numbers: 50,
      //       uid: 1,
      //       price: 20,
      //       photo_addr: "111",
      //       status1: 0
      //     },
      //     {
      //       pid: 2,
      //       numbers: 50,
      //       uid: 1,
      //       price: 21,
      //       photo_addr: "111",
      //       status1: 0
      //     }
      //   ],
        // total_price: 200,
        // mid: 2,
        // addr: "131232r",
        // uid: "1111"
      // };
      let url = "/idea/test";

      this.$http.post(url,data).then(res => {
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
