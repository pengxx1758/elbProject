<template>
    <div>
        <el-carousel trigger="click">
        <el-carousel-item v-for="item in 4" :key="item">
            <img src="..\assets\images\carousel1.png" alt="">
        </el-carousel-item>
        </el-carousel>
        
    </div>
</template>

<script>

export default {
    name: "indexContent",
    date(){
        return{

        }
    },
}
</script>

<style scoped>
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
  margin-top: 10px;
}

/* .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
</style>

