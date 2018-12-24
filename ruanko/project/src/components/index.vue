<template>
    <el-container>
  <el-aside width="200px" >
    <shoptype></shoptype> 
  </el-aside>
  <el-main style="padding:0 10px 0 10px;">
    <router-view></router-view>
  </el-main>
</el-container>
    
    
</template>

<script>
import shoptype from '@/components/shop_type'
import router from '../router'
export default {
  name: "index",
  components:{
    shoptype
  },
  data(){
    return{
      
    }
  },
};
</script>

<style>

</style>
