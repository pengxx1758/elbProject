<template>
  <div id="merchant_check_Block">
    <div class="nav">
      <div class="nav_title">店铺审核</div>
    </div>
    <div class="info_Block">
      <el-table
        :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
        style=" width: 100%; text-align:center;"
        v-loading="loading"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="shopName" label="店铺名称"></el-table-column>
        <el-table-column prop="mType" label="店铺类型"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="detail(scope.$index,scope.row)">查看详情</el-button>
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

    <el-dialog title="详细审核信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="checkForm" ref="registerRuleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="checkForm.username" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tell">
          <el-input v-model="checkForm.tell" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="idName">
          <el-input v-model="checkForm.idName" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input v-model="checkForm.idCard" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" prop="addr">
          <el-input v-model="checkForm.addr" :readonly="true"></el-input>
        </el-form-item>

        <el-form-item id="photo" label="相关图片" prop="photos">
          <img :src="checkForm.p1" alt>
          <img :src="checkForm.p2" alt>
          <img :src="checkForm.p3" alt>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="disagree(checkForm.id)">不予通过</el-button>
        <el-button type="success" @click="agree(checkForm.id)">通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "manager_check",
  created() {
    this.getTableData();
    this.aid = this.$session.get('aid');
  },
  computed: {
    // tableData: function(){
    //   return this.getTableData()
    // }
  },
  data() {
    return {
      dialogVisible: false,
      loading: true,
      // 详细信息表单
      checkForm: {
        username: "",
        tell: "",
        idName: "",
        idCard: ""
      },
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      //   totalCount: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 10,

      // 管理员id
      aid: ''
    };
  },
  methods: {
    getTableData() {
      let url = "/idea/findUnreviewedMessage";
      this.$http
        .get(url, {})
        .then(res => {
          this.tableData = [];
          // this.tableData = res.data;
          res.data.merchant.forEach((el, index) => {
            const item = {
              id: el.id,
              username: el.username,
              tell: el.tell,
              shopName: el.shopName,
              addr: el.addr,
              mType: el.mType,
              idName: el.idName,
              idCard: el.idCard,
              photos: el.state_message_addr
            };
            this.tableData.push(item);
          });
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    detail(index, data) {
      if (data.photos != null) {
        var p = data.photos.split(",");
        for (let i = 0; i < 3; i++) {
          if (p[i] === undefined) {
            p[i] = "";
          }
        }
      } else {
        var p = [];
        for (let i = 0; i < 3; i++) {
          p[i] = "";
        }
      }
      this.checkForm = {
        id: data.id,
        username: data.username,
        tell: data.tell,
        idName: data.idName,
        idCard: data.idCard,
        addr: data.addr,
        p1: p[0],
        p2: p[1],
        p3: p[2]
      };
      this.dialogVisible = true;
    },

    // 审核通过
    agree(mid) {
      let url = "/idea/managerReviewMerchant";
      this.$http
        .get(url, {
          params: {
            aid: this.aid,
            mid: mid,
            state: "1"
          }
        })
        .then(res => {
          // console.log(res);
          if (res.data.status == "0") {
            this.$message({
              type: "success",
              message: res.data.message
            });
            this.dialogVisible = false;
            var index = this.tableData.findIndex(el => el.id == mid);
            this.tableData.splice(index, 1);
            this.getTableData();
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 审核不通过
    disagree(mid) {
      let url = "/idea/managerReviewMerchant";
      this.$http
        .get(url, {
          params: {
            aid: this.aid,
            mid: mid,
            state: "2"
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            this.$message({
              type: "success",
              message: res.data.message
            });
            this.dialogVisible = false;
            var index = this.tableData.findIndex(el => el.id == mid);
            this.tableData.splice(index, 1);
          } else {
            this.$message.error(res.data.message);
          }
        });
    },

    handleCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
  margin-right: 20px;
}
#merchant_check_Block {
  height: 100%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #fff;
}

#merchant_check_Block > .nav {
  height: 60px;
  line-height: 60px;
  border-bottom: 3px solid #409eff;
  margin-bottom: 20px;
}

.nav > .nav_title {
  padding-left: 20px;
  font-weight: 700;
  font-size: 20px;
  text-align: left;
}

</style>
