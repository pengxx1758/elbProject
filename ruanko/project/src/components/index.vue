<template>
    <el-container>
  <el-aside width="200px">
    <shoptype></shoptype> 
  </el-aside>
  <el-main>
    <el-carousel trigger="click">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="..\assets\images\carousel1.png" alt="">
      </el-carousel-item>
    </el-carousel>
  </el-main>
</el-container>
    
    
</template>

<script>
import shoptype from '@/components/shop_type'
export default {
  name: "index",
  components:{
    shoptype
  },
  data(){
    return{
      
    }
  }
};
</script>

<style>
.el-carousel__item p {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item > img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
