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
        v-loading="loading"
      >
        <el-table-column prop="orderTime" label="下单时间" width="100"></el-table-column>

        <el-table-column label="订单内容" prop="orderContent" width="300">
          <template slot-scope="scope">
            <div id="orderContent">{{ scope.row.orderContent }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="orderPay" label="支付金额" width="180"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="180"></el-table-column>
        <el-table-column prop="orderAction" label="操作">
          <template slot-scope="scope">
            <!-- 1已付款 -->
            <el-button v-if="scope.row.orderState == '1'" type="success" size="mini" @click="receiveOrder(scope.$index, scope.row.orderId)">接单</el-button>
            <el-button v-if="scope.row.orderState == '1'" type="danger" size="mini" @click="cancelOrder">取消订单</el-button>
            <!-- 2已接单 -->
            <el-button v-if="scope.row.orderState == '2'" type="danger" size="mini" @click="cancelOrder">取消订单</el-button>
            <!-- 3请求催单 -->
            <el-button v-if="scope.row.orderState == '3'" type="success" size="mini">回复</el-button>
            <!-- 4申请退单 -->
            <el-button v-if="scope.row.orderState == '4'" type="info" size="mini">联系客户</el-button>
            <el-button v-if="scope.row.orderState == '4'" type="success" size="mini">同意</el-button>
            <el-button v-if="scope.row.orderState == '4'" type="danger" size="mini">拒绝</el-button>
            <!-- 5已完成订单 -->
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
    this.getData();
    
    // console.log(this.tableData);
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
      PageSize: 10,

      // 缓冲过渡开关
      loading: true
    };
  },
  methods: {
    getData() {
      let url = "/idea/getOrders";
      this.$http
        .get(url, {
          params: {
            id: this.$session.get("mid")
          }
        })
        .then(res => {

          // 拼接数据
          // res.data.orderitems.forEach((el,index) => {
          //     console.log(index,el);
          //   })
          res.data.message.forEach((el,index) => {
            console.log(index,el);
            const item = {
              orderId: el.id,
              orderTime: this.getDate(el.create_time),
              orderContent: el.pNameAndNumner,
              orderPay: '￥'+el.total_price,
              orderState: el.stated,
              orderStatus: this.getOrderState(el.stated)
            };
            this.tableData.push(item);

          })
          this.loading = false;
        });
    },
    // 商家家接单
    receiveOrder(index, id) {
      // 接单请求
      let url = "/idea/receiveOrdered";
      this.$http.get(url,{
        params:{
          id: id
        }
      })
      .then(res => {
        
        // console.log(res);
        this.$message({
          type: 'success',
          message: '接单成功'
        })
        this.tableData[index].orderState = '2'
      })
    },
    cancelOrder(id){
      // 取消订单请求
    },

    // 显示的当前页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    },

    // 时间戳转年月日时分秒
    getDate(timestamp) {
      return new Date(timestamp).toLocaleDateString();
    },
    // 获得订单内容
    // getOrderContent(productStr) {
    //   var str = '';
    //   var str1 = productStr.split(';');
    //   for(var i=0;i<str1.length;i++){
    //     str += str1[i]+ '份';
    //   }
    //   return str;
    // },
    // 获得订单状态
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

