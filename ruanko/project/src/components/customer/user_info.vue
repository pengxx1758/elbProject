<template>
  <div id="userInfoBlock">
    <div class="info">
      <div class="info_item">
        <div class="photo">
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
          <!-- <img src="..\..\assets\images\userphoto.jpg" alt=""> -->
        </div>
        <div class="persondata">
          <h3>你好，{{this.$session.get('username')}}</h3>
        </div>
      </div>
    </div>

    <div class="recenOrder">
      <div class="nav">
        <a href="#" id="nav_title">最近订单</a>
      </div>
      <div class="order_block" v-loading="loading">
        <div class="show" v-if="orderItems.length <= 0">暂无订单</div>
        <div v-for="order in orderItems" :key="order.id" class="order_item">
          <div class="inner_order_item order_info clear">
            <a class="logo" href="#">
              <img :src="order.shopSrc" alt>
            </a>
            <h3 class="name">
              <a href="#">{{order.shopName}}</a>
            </h3>
            <p class="product">{{order.orderContent}}</p>
            <a class="productnum" href="#">共
              <span class="red">{{order.total_num}}</span>件商品
            </a>
          </div>
          <div class="inner_order_item order_time">{{order.orderDateTime}}</div>
          <div class="inner_order_item order_price">
            <p class="total">￥{{order.total_price}}</p>
          </div>
          <div class="inner_order_item order_status">
            <p class="end">{{order.orderStatus}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user_info",
  created() {
    this.getRencenOrder();
    // console.log(this.getAllNumber('菜品1,1;菜品2,2;'));
  },
  data() {
    return {
      imageUrl: require("../../assets/images/userphoto.jpg"),

      orderItems: [],
      loading: true,
    };
  },
  methods: {
    // 获得最新的三条订单信息
    getRencenOrder(){
      let url = '/idea/return3LastOrder';
      this.$http.get(url,{
        params:{
          uid: this.$session.get('uid'),
        } 
      })
      .then(res => {
        console.log(res);

        res.data.lists.forEach(el => {
          var imgUrl = require('../../assets/images/noimg.jpg');
          if(el.head_addr != null){
            imgUrl = 'http://localhost:8081/upload/images/'+el.head_addr;
          }
          const item = {
          orderId: el.id, // 订单id
          shopSrc: imgUrl,  // 店铺图片地址
          shopName: el.merchantName, // 店铺名
          orderContent: el.pNameAndNumner,  // 订单内容 xxx,x份;..
          total_num: this.getAllNumber(el.pNameAndNumner),  // 每张订单的份数之和 
          orderDateTime: this.getDate(el.create_time), // 订单建立时间
          total_price: el.total_price, //订单总金额
          orderState: el.stated, // 订单状态
          orderStatus: this.getOrderState(el.stated),
        }
        this.orderItems.push(item);
        });
        this.loading = false;
        
      })
    },
    // 时间戳获得下单时间
    getDate(timestamp) {
      return new Date(timestamp).toLocaleDateString();
    },
    // 获得总份数
    getAllNumber(str){
      var num = 0;
      var str1 = str.split(';');
      console.log(str1);
      for(var i=0;i<str1.length;i++){
        var str2 = str1[i].split(',');
        console.log(str2[1]);
        if(str2[1] != undefined){
          num += parseInt(str2[1]);
        }
      }
      return num;
    },
    getOrderState(state) {
      switch (state) {
        case "0":
          return "未付款";
        case "1":
          return "已付款";
        case "2":
          return "已接单";
        case "3":
          return "请求催单";
        case "4":
          return "申请退订";
        case "5":
          return "已完成订单";
        case "6":
          return "已完成退单";
      }
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = "http://localhost:8081/upload/images/" + res.fileName;
      console.log(res);
      console.log(this.imageUrl);
      //更新数据库
      let url = "/idea/updateCustmerMessage";
      this.$http
        .get(url, {
          params: {
            id: this.$session.get("uid"),
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
#userInfoBlock {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* background-color: pink; */
}
#userInfoBlock > .info {
  margin-bottom: 20px;
  width: 100%;
  background-color: #fff;
  padding: 30px 0;
}
.info > .info_item {
  display: table-cell;
  text-align: center;
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
.info > .info_item > .persondata {
  display: inline-block;
}

#userInfoBlock > .recenOrder {
  padding: 20px 20px 0;
  background-color: #fff;
}
.recenOrder > .nav {
  height: 40px;
  line-height: 40px;
  padding: 0 10xp;
}
.recenOrder > .nav > a {
  display: block;
  border-bottom: 3px solid #409eff;
  text-align: left;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  color: #666;
}
.recenOrder > .order_block {
  width: 100%;
}
.show{
  height: 50px;
  font-size: 20px;
}
.recenOrder > .order_block > .order_item {
  padding: 20px 0 15px;
  text-align: center;
}
.order_item > .inner_order_item {
  display: table-cell;
  vertical-align: middle;
  font-size: 12px;
}
.order_item > .order_info {
  text-align: left;
}
.order_item > .order_info > .name,
.order_item > .order_info > .product {
  width: 630px;
}
.order_item > .order_info > .logo {
  float: left;
  margin-right: 20px;
}
.order_item > .order_info > .logo img {
  border-radius: 50%;
  width: 70px;
  height: 70px;
}
.order_item > .order_info > .name {
  font-size: 16px;
  font-weight: 700;
}
.order_item > .order_info > .product {
  margin: 7px 0;
  color: #999;
}
.order_item > .order_info > .productnum {
  color: #999;
}
.order_item > .order_time {
  width: 85px;
  color: #999;
  margin-left: 200px;
}
.order_item > .order_price {
  width: 190px;
}
.order_item > .order_price > .total {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}
.order_item > .order_status {
  width: 100px;
}
.order_item > .order_status .end {
  color: #999;
  font-size: 16px;
}
.order_item > .order_status a {
  color: #409eff;
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
</style>
