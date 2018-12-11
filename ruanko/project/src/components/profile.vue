<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :router="true"
        style="height:600px;"
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="vertical"
      >
        <el-menu-item index="/profile/info">个人中心</el-menu-item>
        <el-menu-item index="/profile/order">我的订单</el-menu-item>
        <el-menu-item index="/profile/address">地址管理</el-menu-item>
        <el-menu-item index="/profile/favor">收藏中心</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="padding:0 0 0 20px;">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "profile",
  watch: {
    $route(to, from) {
      console.log("from:---" + from.path);
      console.log(to.path);
    }
  },
  data() {
    return {
      activeIndex: " "
    };
  },
  methods: {}
};
</script>
<style scoped>
.el-menu-item {
  font-weight: 700;
  font-size: 18px;
}
</style>


    

