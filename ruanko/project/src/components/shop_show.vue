<template>
  <!-- <div class="outer"></div> -->
  <div id="shopBlock">
    <!-- <img  src="..\assets\images\111.png" class="image"> -->
    <el-row :gutter="24">
      <el-col v-for="shop in shopList" :key="shop.id" :span="6">
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <!-- <img v-bind:src="shop.src" class="image"> -->
            <img src="..\assets\images\shoppic.png" class="image">
            <div style="padding: 14px;">
              <span id="shop_name">{{shop.shopName}}</span>
              <div class="bottom clearfix">
                <el-rate
                  v-model="shop.rate"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
                <span id="sale">销量：{{shop.sale}}</span>
                <el-button size="samll" type="primary" round id="btn_shop">去看看</el-button>
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
      console.log(to.path);
      this.shopType = this.$route.params.typeName;
      this.getShopData();
    }    
  },

  data() {
    return {
      name: "shop_show",
      rateValue: 4.8,
      shopType: "",
      shopList: [],
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
          this.shopList = res.data.merchants;
        })
        .catch(error => {
          console.log(error);
        });
    }
    // clicked() {
    //   this.$bus.$emit("test", "aaaaa");
    //   this.$store.dispatch("user/Login", {
    //     name: "a",
    //     password: "asd"
    //   });
    //   console.log(getName());
    // }
  }
};
</script>

<style scoped>
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
  width: 80%;
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
  float: left;
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
  float: right;
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
