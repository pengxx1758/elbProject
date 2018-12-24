<template>
  <div>
    <div class="head">
      <div class="header_inner">
        <span class="title">订单详细信息</span>
        <div class="step">
          <el-steps :space="200" :active="1" finish-status="success" :align-center="true">
            <el-step title="下单"></el-step>
            <el-step title="确认订单"></el-step>
            <el-step title="付款"></el-step>
          </el-steps>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div id="order_content">
      <div id="order_detail" class="fl">
        <div class="nav">
          <div class="nav_title">订单详情</div>
        </div>
        <div class="order_list">
          <el-table :data="order.orderItems" style=" width: 100%; text-align:center;">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column prop="name" label="商品"></el-table-column>
            <el-table-column prop="numbers" label="份数"></el-table-column>
            <el-table-column prop="total" label="小计(元)">
              <template slot-scope="scope">￥{{scope.row.total}}</template>
            </el-table-column>
          </el-table>
          <div class="order_total">
            ￥
            <span>{{order.total_price}}</span>
          </div>
        </div>
      </div>
      <div id="order_other" class="fl">
        <div class="nav">
          <div class="nav_title">其他订单信息</div>
        </div>
        <div class="order_address">
          <div class="min_title">
            收货地址
            <a class="address_link" href="/profile/address">管理我的地址</a>
          </div>
          <div id="address_list">
            <div
              v-for="address in addressList"
              :key="address.id"
              @click="selectAddr(address)"
              class="address_item"
              :class="{select: address.id === currentAddr.id}"
            >
              <div class="icon">
                <i class="el-icon-location-outline"></i>
              </div>
              <div class="address_info">
                <p>{{address.contract_man}} {{address.contract_tel}}</p>
                <p class="addr">{{address.addr}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="check_order_block">
        <span>应付金额 ￥</span>
        <span class="total">{{order.total_price}}</span>
        <el-button class="check_btn" type="danger" @click="checkOrder">确认下单</el-button>
      </div>

      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order_check",
  created() {
    this.getAddressList();
    this.order.orderId = this.$session.get('orderId');
    this.order.orderItems = this.$session.get('orderitems');
    this.order.total_price = this.$session.get('total');
  },
  data() {
    return {
      order: {
        orderId: 1,
        orderItems: [
          // {
          //   id: 0,
          //   name: "菜1",
          //   quantity: 2,
          //   total: "15" // 小计
          // },
          // {
          //   id: 1,
          //   name: "菜2",
          //   quantity: 2,
          //   total: "8" // 小计
          // },
          // {
          //   id: 2,
          //   name: "菜3",
          //   quantity: 1,
          //   total: "9" // 小计
          // }
        ],
        total_price: 666
      },

      addressList: [
        {
          id: 0,
          content_man: "测试员1",
          content_tell: "13333333333",
          addr: "xx市xx区xx街道xx栋"
        },
        {
          id: 1,
          content_man: "测试员2",
          content_tell: "13333333333",
          addr: "xx市xx区xx街道xx栋"
        },
        {
          id: 2,
          content_man: "测试员3",
          content_tell: "13333333333",
          addr: "xx市xx区xx街道xx栋"
        }
      ],
      currentAddr: {
        id: "",
        contract_man: "",
        contract_tell: "",
        addr: ""
      },
      aid: '',
    };
  },
  methods: {
    // 获取个人所有地址
    getAddressList() {
      let url = "/idea/findCustmerAddr";
      this.$http
        .get(url, {
          params: {
            uId: this.$session.get('uid'),
          }
        })
        .then(res => {
          console.log(res);
          this.addressList = res.data.address;
        });
    },
    // 获取所下订单的详细信息
    getOrderTable() {
      let url = "/idea/";
      this.$http
        .get(url, {
          params: {}
        })
        .then(res => {
          console.log(res);
          // this.orderTable = res.data
        });
    },
    // 选中地址
    selectAddr(item) {
      this.currentAddr = {
        id: item.id,
        contract_man: item.contract_man,
        contract_tell: item.contract_tell,
        addr: item.addr
      };
      this.aid = item.id;
      console.log(this.aid);
    },

    // 调用支付宝接口
    checkOrder() {
      let url = "/idea/payment";
      this.$http
        .get(url, {
          params: {
            addr: this.aid,
            id: this.orderId,
            total_price: this.total_price,
            orderName: "外卖"
          }
        })
        .then(res => {
          console.log(res);
          const div = document.createElement("div");
          div.innerHTML = res.data; //此处form就是后台返回接收到的数据
          document.body.appendChild(div);
          document.forms[0].submit();
        });
    }
  }
};
</script>

<style scoped>
p,
span,
h1,
h2,
h3 {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
.head {
  width: 100%;
  height: 100%;
  background-color: #409eff;
  border-top: 1px solid #027ecb;
  padding-top: 5px;
  color: #fff;
}
.header_inner {
  width: 100%;
  margin: 0 auto;
  text-align: left;
}
.header_inner > .title {
  float: left;
  padding: 0 0 0 20px;
  line-height: 57px;
  font-size: 26px;
  font-weight: 700;
}
.step {
  line-height: 0;
  width: 600px;
  float: right;
}

#order_content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 50px 0;
  margin-bottom: 20px;
}

#order_detail {
  width: 29%;
  margin-right: 1%;
  border: 1px solid #eee;
  background-color: #fff;
  box-sizing: border-box;
}

#order_detail > .order_list {
  padding: 0 20px;
}
.order_list > .order_total {
  color: #f74342;
  text-align: right;
  padding: 50px 20px 20px;
}
.order_total span {
  font-size: 46px;
}

#order_other {
  width: 70%;
  min-height: 600px;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #eee;
}

#order_other .min_title {
  text-align: left;
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  line-height: 40px;
  padding-left: 20px;
  margin-bottom: 10px;
}
.address_link {
  font-weight: normal;
  float: right;
  margin-right: 20px;
  font-size: 14px;
}
#address_list {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
#address_list > .address_item {
  width: 100%;
  height: 46px;
  padding: 10px 0;
  border: 1px solid #eee;
  cursor: pointer;
}
#address_list > .select {
  border: 1px solid #0089dc;
}

.address_item .icon {
  width: 60px;
  padding: 5px 0;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  font-size: 30px;
  border-right: 1px solid #eee;
}
.address_item .address_info {
  display: table-cell;
  text-align: left;
  padding-left: 15px;
}
.address_item .address_info > .addr {
  font-size: 16px;
  color: #666;
}

#check_order_block {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ddd;
  height: 50px;
  text-align: right;
  background-color: rgba(255, 255, 255, 0.8);
}
#check_order_block .total {
  color: #f74342;
  font-weight: 700;
  font-size: 24px;
}
.check_btn {
  margin: 5px 30px 0 10px;
}

#order_other > .nav,
#order_detail > .nav {
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
.fl {
  float: left;
}

.clear {
  clear: both;
}
</style>

