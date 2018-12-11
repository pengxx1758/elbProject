<template>
  <div id="userInfoBlock">
    <div class="info">
      <div class="info_item">
        <div class="photo">
          <img src="..\assets\images\userphoto.jpg" alt="">
        </div>
        <div class="persondata">
          <h3>你好，PXX</h3>
        </div>
      </div>

    </div>

    <div class="recenOrder">
      <div class="nav">
        <a href="#" id="nav_title">最近订单</a>
      </div>
      <div class="order_block">
        <div class="order_item">
          <div class="inner_order_item order_info clear">
            <a class="logo" href="#">
              <img src="..\assets\images\orderpic.jpg" alt>
            </a>
            <h3 class="name">
              <a href="#">XXXXX店</a>
            </h3>
            <p class="product">xxxxxx1份</p>
            <a class="productnum" href="#">共<span class="red">1</span>件商品
            </a>
          </div>
          <div class="inner_order_item order_time">2018年11月30日 09:14:56</div>
          <div class="inner_order_item order_price">
            <p class="total">￥88.88</p>
          </div>
          <div class="inner_order_item order_status">
            <p class="end">订单已完成</p>
            <a href="#">订单详情>></a>
          </div>
        </div>
        <div class="order_item">
          <div class="inner_order_item order_info clear">
            <a class="logo" href="#">
              <img src="..\assets\images\orderpic.jpg" alt>
            </a>
            <h3 class="name">
              <a href="#">XXXXX店</a>
            </h3>
            <p class="product">xxxxxx1份</p>
            <a class="productnum" href="#">共<span class="red">1</span>件商品
            </a>
          </div>
          <div class="inner_order_item order_time">2018年11月30日 09:14:56</div>
          <div class="inner_order_item order_price">
            <p class="total">￥88.88</p>
          </div>
          <div class="inner_order_item order_status">
            <p class="end">订单已完成</p>
            <a href="#">订单详情>></a>
          </div>
        </div>
        <div class="order_item">
          <div class="inner_order_item order_info clear">
            <a class="logo" href="#">
              <img src="..\assets\images\orderpic.jpg" alt>
            </a>
            <h3 class="name">
              <a href="#">XXXXX店</a>
            </h3>
            <p class="product">xxxxxx1份</p>
            <a class="productnum" href="#">共<span class="red">1</span>件商品
            </a>
          </div>
          <div class="inner_order_item order_time">2018年11月30日 09:14:56</div>
          <div class="inner_order_item order_price">
            <p class="total">￥88.88</p>
          </div>
          <div class="inner_order_item order_status">
            <p class="end">订单已完成</p>
            <a href="#">订单详情>></a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "user_info",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
h1,
h2,
h3,
h4,p {
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
.info > .info_item{
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.info > .info_item > .photo{
  margin: 0 20px;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  float: left;
}
.info > .info_item > .photo > img{
  width: 112px;
  height: 112px;
}
.info > .info_item > .persondata{
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
.order_item > .order_price{
  width: 190px;
}
.order_item > .order_price > .total{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}
.order_item > .order_status{
  width: 100px;
}
.order_item > .order_status .end{
  color: #999;
  font-size: 16px;
}
.order_item > .order_status a{
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
</style>
