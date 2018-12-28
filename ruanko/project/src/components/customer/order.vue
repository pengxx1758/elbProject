<template>
  <div id="order_block">
    <div class="nav">
      <div class="nav_title">近三个月订单</div>
    </div>
    <div class="other">
      <a href="#">常见问题</a>
    </div>
    <div class="order_page">
      <el-table
        :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="orderDateTime" label="下单时间" width="100"></el-table-column>
        <el-table-column label="下单内容" width="100">
          <template slot-scope="scope">
            <div class="order_pic">
              <img :src="scope.row.shopSrc" alt>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="orderContent" label width="300">
          <template slot-scope="scope">
            <div id="orderContent">{{ scope.row.orderContent }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="orderPay" label="支付金额" width="180"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="80"></el-table-column>
        <el-table-column prop="orderAction" label="操作" >
          <template slot-scope="scope">
            <!-- 0未付款 -->
            <el-button type="success" v-if="scope.row.orderStated == '0'" size="mini" @click="payOrder">去付款</el-button>
            <!-- 1已付款 -->
            <el-button type="danger" v-if="scope.row.orderStated == '1'" size="mini" @click="cancelOrder">取消订单</el-button>
            <!-- 2已接单 -->
            <el-button type="success" v-if="scope.row.orderStated == '2'" size="mini" >催单</el-button>
            <el-button type="danger" v-if="scope.row.orderStated == '2'" size="mini">请求退单</el-button>
            <el-button type="danger" v-if="scope.row.orderStated == '2'" size="mini" >确认送达</el-button>
            <!-- 3请求催单 -->
            <el-button  type="info" v-if="scope.row.orderStated == '3'" size="mini">联系商家</el-button>
            <el-button type="danger" v-if="scope.row.orderStated == '3'" size="mini" >确认送达</el-button>
            <!-- 4申请退单 -->
            <el-button type="info" v-if="scope.row.orderStated == '4'" size="mini">联系商家</el-button>
            <!-- 5已完成订单 -->
            <el-button type="info" v-if="scope.row.orderStated == '5'" size="mini" @click="orderDetail(scope.$index, scope.row)">订单详情</el-button>
            <el-button type="success" v-if="scope.row.orderStated == '5'" size="mini">再来一单</el-button>
            <!-- 6已完成退单 -->
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
    console.log(11);
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
      PageSize: 4,

      loading: true,
    };
  },
  methods: {
    getData() {
      let url = "/idea/checkOrder";
      this.$http
        .get(url, {
          params: {
            uid: this.$session.get("uid")
          }
        })
        .then(res => {
          console.log(res);

          res.data.orders.forEach(el => {
            var imgUrl = require("../../assets/images/noimg.jpg");
            if (el.head_addr != null) {
              imgUrl = "http://localhost:8081/upload/images/" + el.head_addr;
            }
            const item = {
              orderDateTime: this.getDate(el.create_time),
              shopSrc: imgUrl,
              orderContent: el.pNameAndNumner,
              orderPay: '￥' + el.total_price,
              orderStatus: this.getOrderState(el.stated),
              orderStated: el.stated, 
            };
            this.tableData.push(item);
          });
          this.loading = false;
        });
    },
    // 取消订单
    cancelOrder(orderId){
      let url = "/idea/cancelOrder";
      this.$http.get(url,{
        params:{
          oid:orderId,
        }
      })
      .then(res => {
        console.log(res);
        if(res.data.message == 'sucessful'){
          this.$message({
            type: 'success',
            message: '取消订单成功'
          });
        }else{
          this.$message.error('取消订单失败');
        }
      })
    },
    orderDetail(index, row) {
      console.log(index, row);
    },
    // 时间戳获得下单时间
    getDate(timestamp) {
      return new Date(timestamp).toLocaleDateString();
    },
    getOrderState(state) {
      switch (state) {
        case "0":
          return "未付款";
        case "1":
          return "已付款";
        case "2":
          return "已接单";
        case "3":
          return "请求催单";
        case "4":
          return "申请退订";
        case "5":
          return "已完成订单";
        case "6":
          return "已完成退单";
      }
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

