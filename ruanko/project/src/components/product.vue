<template>
  <div>
    <div id="merchant_info">
      <div class="info_left">
        <img src="..\assets\images\shoppic.png" alt>
        <div class="merchant_base_info">
          <div class="shop_name">约吃潮汕</div>
          <el-rate
            v-model="shopRate"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>
      </div>
      <div class="info_right">
        <span>
          <em>起送价</em>
          <em class="right_value">10元</em>
        </span>
        <span>
          <em>配送费</em>
          <em class="right_value">免配送费</em>
        </span>
        <span>
          <em>平均送达时间</em>
          <em class="right_value">30分钟</em>
        </span>
      </div>
      <a href="#" class="shop_favor">
        <i class="el-icon-star-on"></i>
        <span>收藏</span>
      </a>
    </div>
    <div class="merchant_block">
      <div id="merchant_products" class="fl">
        <div class="nav">
          <div class="nav_title">商家商品</div>
        </div>
        <div class="product_block">
          <!-- <el-button type="primary" @click="show">显示</el-button> -->
          <div v-for="product in products" :key="product.id" class="product_item">
            <img src="..\assets\images\shoppic.png" alt>
            <div class="food_main">
              <span>{{product.product_name}}</span>
                <el-rate
                  v-model="product.rate"  
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>

              <p>月售{{product.sale}}份</p>
              <span class="food_price">￥{{product.price}}</span>
            </div>
            <el-button v-if="!product.productNum" class="addShopCart" type="primary" round size="small" @click="firstAdd(product.id)">加入购物车</el-button>
            <el-input-number v-if="product.productNum" class="addShopCart" size="small" v-model="product.productNum" @change="updateProNum(product.productNum,product.id)"></el-input-number>
          </div>

        </div>
      </div>
      <div id="merchant_notice" class="fl">
        <div class="nav">
          <div class="nav_title">商家公告</div>
        </div>
        <div class="notice_content">
          公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容
        </div>
      </div>
    </div>
    <div id="shop_cart">购物车</div>
    <!-- <el-container>
      <el-main>
        <div></div>
      </el-main>
      <el-aside width="200px">Aside</el-aside>
    </el-container>-->
  </div>
</template>

<script>
export default {
  name: "produce",
  created() {},
  data() {
    return {
      shopRate: 4.5,
      products: [
        {
          id: 0,
          product_name: '菜1',
          rate: 4.6,
          sale: 243,
          price: 12.50,
          productNum: 0,
          addFlag: false
        },
        {
          id: 1,
          src: '',
          product_name: '菜2',
          rate: 4.2,
          sale: 56,
          price: 10.50,
          productNum: 0,
          addFlag: false
        },
        {
          id: 2,
          product_name: '菜3',
          rate: 3.8,
          sale: 13,
          price: 9.50,
          productNum: 0,
          addFlag: false
        },
        {
          id: 3,
          product_name: '菜4',
          rate: 2.6,
          sale: 54,
          price: 20.50,
          productNum: 0,
          addFlag: false
        },
        {
          id: 4,
          product_name: '菜5',
          rate: 4.3,
          sale: 252,
          price: 8.50,
          productNum: 0,
          addFlag: false
        },
        {
          id: 5,
          product_name: '菜6',
          rate: 4.6,
          sale: 123,
          price: 6.50,
          productNum: 0,
          addFlag: false
        },
      ]
    };
  },
  methods: {
    // show(){
    //   console.log(this.products);
    // },
    firstAdd(id){
      this.products[id].addFlag = !this.products[id].addFlag;
      this.products[id].productNum = 1;
    },
    updateProNum(val,id){
      // console.log("value"+val);
      // console.log("id--"+id);
      if(val<1){
        this.products[id].addFlag = !this.products[id].addFlag;
      }

    }
  }
};
</script>

<style scoped less>
.el-main {
  padding: 0;
  height: 100%;
}
a {
  text-decoration: none;
}
h1,
h2,
h3,
h4,
p,
span {
  margin: 0;
  padding: 0;
}

#merchant_info {
  width: 100%;
  height: 200px;
  margin-bottom: 0;
  padding: 0 40px;
  color: #fff;
  position: relative;

  box-sizing: border-box;
  background: url("../assets/images/product_nav.jpg") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  display: table;
  /* filter: blur(10px) */
}

#merchant_info > .info_left {
  display: table-cell;
  vertical-align: middle;
  text-align: left;
}
.info_left img {
  width: 100px;
  height: 100px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 20px;
}
.info_left > .merchant_base_info {
  display: inline-block;
}
.merchant_base_info > .shop_name {
  font-size: 20px;
  margin-bottom: 5px;
}

#merchant_info > .info_right {
  display: table-cell;
  vertical-align: middle;
  width: 700px;
  text-align: right;
  padding-right: 100px;
}
.info_right > span {
  display: inline-block;
  margin-left: 80px;
  text-align: center;
}
.info_right .right_value {
  display: block;
  margin-top: 10px;
  font-size: 20px;
}

#merchant_info .shop_favor {
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 5px 5px;
  width: 80px;
  color: #eee;
}
.shop_favor > i {
  font-size: 16px;
  margin-top: 5px;
}
.shop_favor > span {
  display: block;
  margin: 8px 0;
}

.merchant_block {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
#merchant_products {
  width: 74%;
  min-height: 600px;
  height: 100%;
  margin-right: 1%;
}

#merchant_products > .product_block {
  height: 100%;
  width: 100%;
}
.product_block .product_item {
  float: left;
  width: 48%;
  margin: 5px 1%;
  font-size: 16px;
  background-color: #fff;
  position: relative;
}
.product_item > img {
  width: 120px;
  height: 120px;
  float: left;
  margin-right: 20px;
}

.product_item > .food_main {
  text-align: left;
}

.food_main > span {
  display: block;
  font-weight: 700;
  margin: 10px 0 0 0;
}
.food_main > p {
  font-size: 14px;
  color: #999;
  display: inline-block;
}
.food_main > .food_price {
  font-size: 20px;
  font-weight: 700;
  color: #f74342;
  position: absolute;
  bottom: 7px;
  left: 140px;
}

.product_item > .addShopCart{
  position: absolute;
  right: 10px;
  bottom: 7px;
}
#merchant_products > .nav,
#merchant_notice > .nav {
  height: 60px;
  line-height: 60px;
  border-bottom: 3px solid #409eff;
}

.nav > .nav_title {
  padding-left: 20px;
  font-weight: 700;
  font-size: 20px;
  text-align: left;
}

#merchant_notice {
  width: 25%;
  height: 600px;
}
#merchant_notice > .notice_content{
  width: 100%;
  background-color: #fff;
  text-align: left;
  text-indent: 2em;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 5px;
}

#shop_cart {
  position: fixed;
  width: 300px;
  right: 0;
  bottom: 0;
  /* display: none; */
  background-color: green;
}
.fl {
  float: left;
}
</style>
