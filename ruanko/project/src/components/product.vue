<template>
  <div>
    <div id="merchant_info">
      <div class="info_left">
        <img :src="shopImg" alt>
        <div class="merchant_base_info">
          <div class="shop_name">{{shopName}}</div>
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
        <div class="product_block" v-loading="loading">
          <!-- <el-button type="primary" @click="show">显示</el-button> -->
          <div v-for="product in products" :key="product.id" class="product_item">
            <img :src="product.photo_addr" alt>
            <div class="food_main">
              <span>{{product.name}}</span>
              <el-rate
                v-model="shopRate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>

              <!-- <p>月售{{product.sale}}份</p> -->
              <p>月售 0 份</p>
              <span class="food_price">￥{{product.price}}</span>
            </div>
            <el-button
              v-if="!product.productNum"
              class="addShopCart"
              type="primary"
              round
              size="small"
              @click="firstAdd(product,$event)"
            >加入购物车</el-button>
            <el-input-number
              v-if="product.productNum"
              class="addShopCart"
              size="small"
              v-model="product.productNum"
              @change="updateProNum(product)"
            ></el-input-number>
          </div>
        </div>
      </div>
      <div id="merchant_notice" class="fl">
        <div class="nav">
          <div class="nav_title">商家公告</div>
        </div>
        <div
          class="notice_content"
        >公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容</div>
      </div>
      <div class="clear"></div>
    </div>


    <div id="shop_cart">
      <div class="shopCart_content">
        <div class="shopCart_top">
          <span class="title">购物车</span>
          <a class="shopCart_clear" href="javascript:;" @click="clearShopCart">[清空]</a>
        </div>
        <div v-for="(product,index) in shopCartGroup" :key="product.id" class="shopCart_item">
          <div class="product_name cell">{{product.name}}</div>
          <div class="product_quantity cell">
            <el-input-number
              class="addShopCart"
              size="mini"
              v-model="product.numbers"
              @change="updateShopCart(product,index)"
            ></el-input-number>
          </div>
          <div class="product_total cell">￥{{product.total}}</div>
        </div>
      </div>
      <div class="shopCart_footer">
        <el-badge :value="this.allProductNum" class="item" id="shopCart_icon">
          <span class="shopCart_icon">
            <i class="el-icon-goods"></i>
          </span>
        </el-badge>
        <span class="total_price">￥{{this.total}}</span>
        <span class="post_price">配送费￥0</span>
        <button v-if="!this.shopCartGroup.length" class="btn_pay shopCart_empty">购物车是空的</button>
        <button v-if="this.shopCartGroup.length" class="btn_pay" @click="toPay">结 算</button>
      </div>
    </div>
    <!-- <el-container>
      <el-main>
        <div></div>
      </el-main>
      <el-aside width="200px">Aside</el-aside>
    </el-container>-->
  </div>
</template>

<script>
import { JQuery } from "@/util/jquery-1.11.1.min.js";
import route from "../router";
// import * as f from '../util/fly'
// import * as f from "@/util/fly";
export default {
  name: "produce",
  created() {
    this.getData();
  },
  mounted() {},
  data() {
    return {
      shopRate: 4.5,
      num: 1,
      shopName: "",
      shopImg: "",
      // 商品缓冲效果开关
      loading: true,
      products: [],
      shopCartGroup: []
    };
  },
  computed: {
    allProductNum: function() {
      return this.getShopCartNum();
    },
    total: function() {
      return this.getTotal();
    }
  },
  methods: {
    getData() {
      // 获得店铺基本信息
      let url = "/idea/findMerchantMessage";
      this.$http
        .get(url, {
          params: {
            id: this.$session.get("shopid")
          }
        })
        .then(res => {
          // console.log(res);
          this.shopName = res.data.merchant.shopName;
          if (res.data.merchant.head_addr == null) {
            this.shopImg = require("../assets/images/noimg.jpg");
          } else {
            this.shopImg = res.data.merchant.head_addr;
          }
        });
      // 获得店铺产品信息
      url = "/idea/listAllProduct";
      this.$http
        .get(url, {
          params: {
            mid: this.$session.get("shopid")
          }
        })
        .then(res => {
          // console.log(res);
          this.products = res.data.productList;
          this.loading = false;
        });
    },
    show() {
      console.log(this.products);
    },
    firstAdd(product, e) {
      // console.log(f.fly.toString);

      // let cart = document.getElementById('shopCart_icon').offsetLeft;
      // // let flyer =
      // console.log(cart);
      // // console.log(e.path[2].children[0].src);
      // var a = e.path[2].children[0];
      // a.fly({
      //   start:{
      //     left: e.clientX,
      //     top: e.clientY
      //   },
      //   end: {
      //     left:11,
      //     top: 11
      //   },

      // })
      // console.log(a);
      product.productNum = 1;
      const item = {
        pid: product.id,
        name: product.name,
        numbers: 1,
        price: product.price,
        total: product.price // 小计
      };
      this.shopCartGroup.push(item);
    },
    updateProNum(product) {
      let index = this.shopCartGroup.findIndex(ele => ele.pid === product.id);
      let cartProduct = this.shopCartGroup[index];

      if (product.productNum < 1) {
        product.addFlag = !product.addFlag;
        // 删除购物车的记录
        this.shopCartGroup.splice(index, 1);
      } else {
        // 同步更新购物车列表
        cartProduct.numbers = product.productNum;
        cartProduct.total = cartProduct.numbers * cartProduct.price;
      }
    },
    // 购物车的数量更新
    updateShopCart(product, cartIndex) {
      let index = this.products.findIndex(ele => ele.id === product.pid);
      let sProduct = this.products[index];

      if (product.numbers < 1) {
        // 删除购物车的记录
        sProduct.productNum = 0;
        this.shopCartGroup.splice(cartIndex, 1);
      } else {
        // 同步更新购物车列表
        product.total = product.numbers * product.price;
        sProduct.productNum = product.numbers;
      }
    },
    // 清空购物车
    clearShopCart() {
      this.shopCartGroup.forEach(cartElement => {
        let index = this.products.findIndex(ele => ele.id === cartElement.pid);
        this.products[index].productNum = 0;
      });
      this.shopCartGroup = [];
    },

    // 获得购物车内的商品总数量
    getShopCartNum() {
      let num = 0;
      this.shopCartGroup.forEach(ele => {
        num += ele.numbers;
      });
      return num;
    },
    // 获得总计
    getTotal() {
      let total = 0;
      this.shopCartGroup.forEach(ele => {
        total += ele.total;
      });
      return total;
    },
    // fly(){
    //   fly();
    // }

    // 跳转到付款页面
    toPay() {
      console.log(this.shopCartGroup);
      this.$session.set('orderitems',this.shopCartGroup);
      this.$session.set('total',this.total);

      let data = new FormData();
      data.append('uid', this.$session.get("uid"));
      data.append('mid', this.$session.get("shopid"));
      data.append('items', JSON.stringify(this.shopCartGroup));
      // data.append('orderitems1', '111');
      data.append('total_price', this.total);

      // 下单
      let url = "/idea/insertOrder";
      this.$http.post(url,data).then(res => {
        console.log(res);
        if(res.data.message == 'successful'){
          this.$message({
            type: 'success',
            message: '初步下单成功'
          })
          this.$session.set('orderId',res.data.id);
          route.push('/ordercheck');
        }else{
          this.$message.error('下单失败')
        }
      });
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
  margin-bottom: 20px;
}
#merchant_products {
  width: 74%;
  min-height: 600px;
  height: 100%;
  margin-right: 1%;
}

#merchant_products > .product_block {
  min-height: 600px;
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

.product_item > .addShopCart {
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
#merchant_notice > .notice_content {
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
  width: 325px;
  right: 0;
  bottom: 0;
  z-index: 1;
  color: #fff;
}

.item {
  margin-top: 10px;
  margin-right: 10px;
}

#shop_cart > .shopCart_content {
  width: 100%;
  box-sizing: border-box;
  height: auto;
  box-shadow: 0 1px 15px #ccc;
}
.shopCart_content > .shopCart_top {
  width: 100%;
  height: 46px;
  line-height: 46px;
  box-sizing: border-box;
  border-top: 2px solid #0089dc;
  color: #333;
  text-align: left;
  background-color: #fafafa;
  font-size: 14px;
}

.shopCart_content > .shopCart_item {
  display: table;
  table-layout: fixed;
  height: 45px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  background-color: #fafafa;
}
.shopCart_item .cell {
  display: table-cell;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}
.shopCart_item > .product_name {
  text-align: left;
  color: #666;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 10px;
  font-size: 14px;
}
.shopCart_item > .product_quantity {
}
.shopCart_item > .product_total {
  text-align: right;
  color: #f17530;
}

.shopCart_top .title {
  padding-left: 10px;
}
.shopCart_top .shopCart_clear {
  color: #0089dc;
}

#shop_cart > .shopCart_footer {
  width: 100%;
  box-sizing: border-box;
  height: 46px;
  line-height: 46px;
  position: relative;
  background-color: #2c2c2c;
  text-align: left;
  padding-left: 5px;
  /* cursor: pointer; */
}
.shopCart_footer .shopCart_icon {
  font-size: 30px;
}

.shopCart_footer > .total_price {
  font-size: 22px;
  border-right: 1px solid #666;
  padding-right: 5px;
}
.shopCart_footer > .post_price {
  font-size: 12px;
  color: #999;
}
.shopCart_footer > .btn_pay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  border: 0;
  width: 120px;
  outline: 0;
  cursor: pointer;
  background-color: #51d862;
  text-align: center;
  color: #fff;
  /* font-weight: 700; */
}
.shopCart_footer .shopCart_empty {
  background-color: #e4e4e4;
  color: #333;
  cursor: default;
}

.fl {
  float: left;
}
.clear {
  clear: both;
}
</style>
