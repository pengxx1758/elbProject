<template>
    <div>
        <div id="index" @click="toIndex">首页</div>
        <!-- <el-menu-item index="/mainIndex">首页</el-menu-item> -->
        <el-menu v-for="shopType in shopTypeList" :key="shopType.id" :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect">
            <el-menu-item index="" @click="toShop(shopType.mtype)" >{{shopType.mtype}}</el-menu-item>
        </el-menu>
    </div>  
</template>

<script>
import router from "../router";
export default {
  name: "shop_type",
  data() {
    return {    
      activeIndex: "",
      shopTypeList: [
        {
          id: 0,
          mtype: "美食"
        },
        {
          id: 1,
          mtype: "便利"
        },
        {
          id: 2,
          mtype: "水果"
        },
        {
          id: 3,
          mtype: "药品"
        },
        {
          id: 4,
          mtype: "甜食饮品"
        }
      ]
    };
  },
  methods: {
    toIndex() {
        router.push('/mainIndex');
    },
    toShop(mtype){
        router.push('/shop_show/'+mtype);
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
  background-color: #409eff;
  border: 0;
  border-radius: 5px 5px 0 0;
}
</style>

