<template>
  <div id="order_block">
    <div class="nav">
      <div class="nav_title">店铺订单</div>
    </div>
    <div class="other">
      <a href="#">常见问题</a>
    </div>
    <div class="order_page">
      <el-table
        :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
        style="width: 100%"
      >
        <el-table-column prop="orderTime" label="下单时间" width="100"></el-table-column>
        
        <el-table-column  label="订单内容" prop="orderContent"  width="300">
          <template slot-scope="scope">
            <div id="orderContent">{{ scope.row.orderContent }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="orderPay" label="支付金额" width="180"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="180"></el-table-column>
        <el-table-column prop="orderAction" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="orderDetail(scope.$index, scope.row)">订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="PageSize"
      layout="total, prev, pager, next, jumper"
      :total="this.tableData.length"
    ></el-pagination>
  </div>
</template> 

<script>
export default {
  name: "order",
  created() {
    this.getData();
  },
  data() {
    return {
      tableData: [
        // {
        //   orderTime: "2018-12-10",
        //   orderContent:
        //     "订单内容订单内容订单内容订单内容订单内容订单内容订单内容订单内容订单内容订单内容订单内容",
        //   orderPay: "121",
        //   orderStatus: "订单已完成"
        // },
        // {
        //   orderTime: "2018-12-9",
        //   orderContent: "1323536243",
        //   orderPay: "112",
        //   orderStatus: "订单已完成"
        // },
        // {
        //   orderTime: "2018-12-99",
        //   orderContent: "133235252",
        //   orderPay: "151",
        //   orderStatus: "订单已完成"
        // },
        // {
        //   orderTime: "2018-12-68",
        //   orderContent: "1314123212",
        //   orderPay: "143",
        //   orderStatus: "订单已完成"
        // },
        // {
        //   orderTime: "2018-12-99",
        //   orderContent: "133235252",
        //   orderPay: "151",
        //   orderStatus: "订单已完成"
        // },
        // {
        //   orderTime: "2018-12-99",
        //   orderContent: "133235252",
        //   orderPay: "151",
        //   orderStatus: "订单已完成"
        // },
        // {
        //   orderTime: "2018-12-99",
        //   orderContent: "133235252",
        //   orderPay: "151",
        //   orderStatus: "订单已完成"
        // }
      ],
      // 总数据
      //   tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 4
    };
  },
  methods: {
    getData() {
        let url = "/idea/getOrders";
        this.$http.get(url,{
            params:{
                id:this.$session.get('mid'),
            }
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.message;
        })
    },
    orderDetail(index, row) {
      console.log(index, row);
    },

    // 显示的当前页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    }
  }
};
</script>

<style scoped>
#order_block {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: #fff;
  /* background-color: skyblue; */
}

#order_block > .nav {
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

#order_block > .other {
  height: 30px;
  line-height: 30px;
}
.other a {
  float: right;
  text-decoration: none;
  color: #999;
}

.order_pic img {
  vertical-align: top;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

#orderContent {
  color: #999;
  padding: 0 10px;
}
</style>

