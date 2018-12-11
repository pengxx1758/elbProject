<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :router="true"
        style="min-height:600px;height:100%;"
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="vertical"
      >
        <el-menu-item index="/manager/customer">用户管理</el-menu-item>
        <el-menu-item index="/manager/merchant">商家管理</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="padding:0 0 0 20px;">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "manager",
  data() {
    return {
      activeIndex: "/manager/customer"
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

