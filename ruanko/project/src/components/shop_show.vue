<template>
  <!-- <div class="outer"></div> -->
  <div id="shopBlock" v-loading="loading">
    <!-- <img  src="..\assets\images\111.png" class="image"> -->
    <el-row :gutter="25">
      <el-col v-for="shop in shopList" :key="shop.id" :span="5">
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <!-- <img v-bind:src="shop.src" class="image"> -->
            <img :src="shop.head_addr" class="image">
            <div style="padding: 0 14px 14px 14px;">
              <span id="shop_name">{{shop.shopName}}</span>
              <div class="bottom clearfix">
                <el-rate
                  v-model="shop.rate"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
                <p><span id="sale">销量：{{shop.sale}}</span></p>
                <p class="delivery">免配送费</p> 
                <el-button
                  size="samll"
                  type="primary"
                  round
                  id="btn_shop"
                  @click="toShop(shop.id)"
                >去看看</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { setName, getName } from "@/util/auth";
import bn from "../assets/images/shoppic.png";
import router from "../router";
export default {
  name: "shop_show",
  mounted() {
    this.shopType = this.$route.params.typeName;
    this.getShopData();
  },
  // computed: {
  //   shopType: function() {
  //     return this.$route.params.typeName;
  //   },
  //   shopList: {
  //     set: function(){
  //       this.getShopData()
  //     },
  //     get: function(){
  //       return [ ];
  //     }
  //   }
  // },
  watch: {
    // $route(){
    //   this.shopType = $route.params.typeName;
    // },
    $route(to, from) {
      // console.log(to.path);
      // console.log(to);
      // console.log(from);
      this.loading = true;
      this.shopType = this.$route.params.typeName;
      this.getShopData();
    }
  },

  data() {
    return {
      name: "shop_show",
      rateValue: 4.8,
      shopType: "",
      shopList: [
        {
          id: 1,
          head_addr: "",
          shopName: "",
          sale: 22,
          rate: 1
        }
      ],
      loading: true
    };
  },

  methods: {
    getShopData() {
      let url = "/idea/listMerchantByType";
      this.$http
        .get(url, {
          params: {
            mType: this.shopType
          }
        })
        .then(res => {
          console.log(res);
          this.shopList = [];
          res.data.merchants.forEach((el, index) => {
            var headAddr = require("../assets/images/noimg.jpg");
            if (el.head_addr != null) {
              headAddr = "http://localhost:8081/upload/images/" + el.head_addr;
            }
            const item = {
              id: el.id,
              head_addr: headAddr,
              shopName: el.shopName,
              sale: el.sale,
              rate: el.rate
            };
            this.shopList.push(item);
          });
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    toShop(shopid) {
      this.$session.set("shopid", shopid);
      router.push("/product");
    }
  }
};
</script>

<style scoped>
p,h1,h2,h3{
  margin: 0;
  padding: 0;
}
.el-row {
  margin-bottom: 20px;
  margin-left: 0 !important;
  margin-right: 0 !important;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  margin-top: 20px;
  border-radius: 4px;
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.image {
  width: 180px;
  height: 180px;
  display: block;
  margin: 5px auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

#shopBlock {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

#shop_name {
  /* font-family: Cursive; */
  font-family: Microsoft Yahei;
  /* font-weight: bold; */
  font-size: 20px;
}

.el-rate {
  height: 30px;
  line-height: 1;
}

#sale {
  font-size: 16px;
}
.delivery{
  font-size: 14px;
  color: #666;
}

.bottom{
  text-align: left;
  position: relative;
}

/* #to_shop {
  position: relative;
  left: 80px;
  top: 0px;
}
#pingfen {
  position: relative;
  left: -85px;
  top: 0px;
}  */
#btn_shop {
  position: absolute;
  right: 0;
  bottom: 0;
}



div.outer {
  overflow: hidden;
  background: #ddd;
  height: 800px;
}
div.shop {
  overflow-x: hidden;
  overflow-y: scroll;
  /* padding-right: 15px; */
  /* content: '移动端不用注释此行， pc端需要注释掉本行'; */
  margin-right: -30px;
  height: 800px;
}
</style>
