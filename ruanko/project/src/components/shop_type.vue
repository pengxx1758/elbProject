<template>
    <div>
        <div id="index" @click="toIndex">首页</div>
        <!-- <el-menu-item index="/mainIndex">首页</el-menu-item> -->
        <el-menu
        style="min-height:540px;"  
        :default-active="activeIndex" 
        class="el-menu-demo" 
        mode="vertical" 
        @select="handleSelect">
            <el-menu-item v-for="shopType in shopTypeList" :key="shopType.id" index="" @click="toShop(shopType.mtype)" >{{shopType.mtype}}</el-menu-item>
        </el-menu>
    </div>  
</template>

<script>
import router from "../router";
export default {
  name: "shop_type",
  created() {
    this.getTypeList();
  },
  mounted() {
    this.shopTypeList = [
      // {
      //   id: 0,
      //   mtype: "美食"
      // },
      // {
      //   id: 1,
      //   mtype: "便利"
      // },
      // {
      //   id: 2,
      //   mtype: "水果"
      // },
      // {
      //   id: 3,
      //   mtype: "药品"
      // },
      // {
      //   id: 4,
      //   mtype: "甜食饮品"
      // }
    ];
  },
  data() {
    return {
      activeIndex: "",
      shopTypeList: ""
    };
  },
  methods: {
    getTypeList(){
      var url = "/idea/listMerType"
      this.$http.get(url,{

      })
      .then(res => {
        console.log(res);
        this.shopTypeList = res.data.allMerTypes;
      })
      .catch(error => {
        console.log(error);
      })
      
    },
    toIndex() {
      router.push("/mainIndex/index_content");
      
    },
    toShop(mtype) {
      // let url = this.HOST + "listMerchantByType";
      // this.$http
      //   .get(url, {
      //     params: {
      //       mType: mtype
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      router.push({ name: 'shop', params: { typeName: mtype } });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
#index {
  height: 56px;
  line-height: 56px;
  cursor: pointer;
  /* background-color: #409eff; */
  border: 0;
  border-radius: 5px 5px 0 0;
}
</style>

