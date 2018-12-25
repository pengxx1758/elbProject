<template>
  <div id="shopBlock">
    <div class="info">
      <el-button v-if="shopState == '1'" type="success" class="shop_btn" @click="changeShopState">营业</el-button>
      <el-button v-if="shopState == '3'" type="danger" class="shop_btn" @click="changeShopState">打烊</el-button>
      <div class="info_item">
        <el-upload
          name="imageFile"
          class="avatar-uploader"
          action="/idea/uploadImage"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <div class="photo">
          <img src="..\..\assets\images\userphoto.jpg" alt="">
        </div>-->
        <div class="shop_data">
          <p class="data_item">
            <span class="data_label">店铺名称:</span>
            <span class="data_content">{{shopName}}</span>
          </p>
          <p class="data_item">
            <span class="data_label">店铺地址:</span>
            <span class="data_content">{{addr}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="comment_block">
      <div class="nav">
        <a href="#" id="nav_title">店铺评价</a>
      </div>
      <div class="comment_content">
        <el-table
          :data="commentData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
          style=" width: 100%; text-align:center;"
          v-loading="loading"
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column prop="username" label="评论用户"></el-table-column>
          <el-table-column prop="comment" label="评论内容"></el-table-column>
          <el-table-column prop="commentTime" label="评论时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="detail(scope.$index,scope.row)">追加评论</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pageBlock">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="PageSize"
          layout="total, prev, pager, next, jumper"
          :total="this.commentData.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "merchant_info",
  created() {
    this.getDate(this.mid);
  },
  data() {
    return {
      shopName: "",
      addr: "",
      imageUrl: "",
      loading: false,
      // 店铺状态
      shopState: "",
      // 总数据
      commentData: [
        {
          username: "111",
          comment: "111111111",
          commentTime: "21212121"
        },
        {
          username: "222",
          comment: "111111111",
          commentTime: "21212121"
        },
        {
          username: "333",
          comment: "111111111",
          commentTime: "21212121"
        },
        {
          username: "444",
          comment: "111111111",
          commentTime: "21212121"
        },
        {
          username: "555",
          comment: "111111111",
          commentTime: "21212121"
        }
      ],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      //   totalCount: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 3
    };
  },
  methods: {
    getDate(mid) {
      let url = "/idea/findMerchantMessage";
      this.$http
        .get(url, {
          params: {
            id: this.$session.get("mid")
          }
        })
        .then(res => {
          console.log(res);
          this.shopName = res.data.merchant.shopName;
          this.addr = res.data.merchant.addr;
          this.shopState = res.data.merchant.state;
          if (res.data.merchant.head_addr != null) {
            this.imageUrl = res.data.merchant.head_addr;
          } else {
            this.imageUrl = require("../../assets/images/noimg.jpg");
          }
        });
    },

    // 改变店铺状态
    changeShopState() {
      let url = "/idea/merchantOpenOrShoring";
      this.$http
        .get(url, {
          params: {
            id: this.$session.get("mid"),
            state: this.shopState
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.status == "0") {
            this.$message({
              type: "success",
              message: res.data.message
            });
            if(this.shopState == '1'){
              this.shopState = '3';
            }else{
              this.shopState = '1';
            }
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = "http://localhost:8081/upload/images/" + res.fileName;
      console.log(res);
      console.log(this.imageUrl);
      //更新数据库
      let url = "/idea/updateMerchantMessage";
      this.$http
        .get(url, {
          params: {
            id: this.$session.get("mid"),
            head_addr: res.fileName
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.status == "0") {
            this.$message({
              type: "success",
              message: res.data.message
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    beforeAvatarUpload(file) {
      const isJP = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJP) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJP && isLt2M;
    },
    handleCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    }
  }
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
p {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #333;
}
#shopBlock {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* background-color: pink; */
}
#shopBlock > .info {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  background-color: #fff;
  padding: 30px 0 30px 20px;
  box-sizing: border-box;
}
.shop_btn {
  position: absolute;
  right: 30px;
  top: 10px;
}
.info > .info_item {
  display: table-cell;
  text-align: left;
  vertical-align: middle;
}
.info > .info_item > .photo {
  margin: 0 20px;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  float: left;
}
.info > .info_item > .photo > img {
  width: 112px;
  height: 112px;
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
  width: 112px;
  height: 112px;
  line-height: 112px;
  text-align: center;
  border: 3px dashed #999;
}
.avatar {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  display: block;
}

.info > .info_item > .shop_data {
  display: inline-block;
}

.shop_data > .data_item {
  padding: 10px 0;
  font-size: 18px;
}
.data_item > .data_label {
}
.data_item > .data_content {
}

#shopBlock > .comment_block {
  height: 300px;
  padding: 20px 20px 0;
  background-color: #fff;
}
.comment_block > .nav {
  height: 40px;
  line-height: 40px;
  padding: 0 10xp;
}
.comment_block > .nav > a {
  display: block;
  border-bottom: 3px solid #409eff;
  text-align: left;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  color: #666;
}

.red {
  color: red;
}
.clear {
  content: "";
  display: table;
  height: 0;
  clear: both;
}
.fr {
  float: right;
}
</style>
