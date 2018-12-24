<template>
  <div id="merchant_Block">
    <div class="nav">
      <div class="nav_title">商家管理</div>
    </div>
    <div class="info_Block">
      <el-table
        :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
        style=" width: 100%; text-align:center;"
        v-loading="loading"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="id" label="id" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="tell" label="手机号码" width="120"></el-table-column>
        <el-table-column prop="shopName" label="店铺名称" width="150"></el-table-column>
        <el-table-column prop="mType" label="店铺类型" width="80"></el-table-column>
        <el-table-column prop="addr" label="店铺地址" width="220"></el-table-column>
        <el-table-column prop="mLock" label="账户状态" width="80"></el-table-column>
        <el-table-column prop="state" label="店铺状态" width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.mLock == '0'"
              type="danger"
              size="mini"
              @click="lock(scope.$index, scope.row)"
            >封禁</el-button>
            <el-button
              v-if="scope.row.mLock == '1'"
              type="success"
              size="mini"
              @click="unlock(scope.$index, scope.row)"
            >解禁</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageBlock">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="PageSize"
        layout="total, prev, pager, next, jumper"
        :total="this.tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "manager_merchant",
  created() {
    this.getTableData();
  },
  data() {
    return {
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      //   totalCount: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 10,

      loading: true
    };
  },
  methods: {
    getTableData() {
      let url = "/idea/managerFindAllMerchant";
      this.$http
        .get(url, {})
        .then(res => {
          // console.log(res);
          this.tableData = res.data.merchant;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    lock(index, row) {
      // console.log(index, row);
      this.$confirm("确认封禁用户"+row.username+"的店铺\""+row.shopName+"\"？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(_ => {
            let url = "/idea/managerManageMer";
            this.$http
            .get(url, {
                params: {
                aid: this.$session.getItem('aid'),
                mid: row.id,
                mlock: row.mLock
                }
            })
            .then(res => {
                // console.log(res);
                this.$message({
                    message: res.data.message,
                    type: 'success'
                })
                row.mLock = "1";
            })
            .catch(error => {
                this.$message.error(res.data.message);
            });
      }).catch(_ => {
          
      })
    },
    unlock(index, row) {
      // console.log(index, row);
      this.$confirm("确认解禁用户"+row.username+"的店铺\""+row.shopName+"\"？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(_ => {
            let url = "/idea/managerManageMer";
            this.$http
            .get(url, {
                params: {
                aid: this.$session.getItem('aid'),
                mid: row.id,
                mlock: row.mLock
                }
            })
            .then(res => {
                // console.log(res);
                this.$message({
                    message: res.data.message,
                    type: 'success'
                })
                row.mLock = "0";
            })
            .catch(error => {
                this.$message.error(res.data.message);
            });
      }).catch(_ => {
          
      })
    },
    handleCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    },

  }
};
</script>

<style scoped>
#merchant_Block {
  height: 100%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #fff;
}

#merchant_Block > .nav {
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
</style>
