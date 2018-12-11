<template>
  <div class="address_blcok">
    <div class="title">地址管理</div>
    <div class="address_list">
      <!-- <el-row>
        <el-col v-for="item in addressList" :key="item.id" :span="8">
        </el-col>
      </el-row>-->
      <div v-for="item in addressList" :key="item.id" class="address_item">
        <div class="address_item_btns">
          <el-button type="text" @click="changeAddress(item)">修改</el-button>
          <el-button type="text" @click="delAddress(item.id)">删除</el-button>
        </div>
        <div class="address_item_name">{{item.username}}</div>
        <div class="address_item_address">{{item.address}}</div>
        <div class="address_item_tel">{{item.tel}}</div>
      </div>
    </div>
    <el-button class="address_add" @click="preAddAddress">
      <i class="el-icon-plus"></i>
      <p>添加收货地址</p>
    </el-button>
    <el-dialog
      title="亲，请输入新的地址信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="addressForm"
        status-icon
        :rules="addAddressRules"
        ref="addressForm"
        label-width="100px"
      >
        <el-form-item label="联系人" prop="contract_man">
          <el-input type="text" v-model="addressForm.contract_man" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="addr">
          <el-input type="text" v-model="addressForm.addr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contract_tel">
          <el-input v-model="addressForm.contract_tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="addAddress('addressForm')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "address",
  data() {
    return {
      addressList: [
        {
          id: 0,
          username: "彭XX1",
          address: "xx街道xx小区xx栋xxx号",
          tel: "18888888888"
        },
        {
          id: 1,
          username: "彭XX2",
          address: "xx街道xx小区xx栋xxx号",
          tel: "18888888888"
        },
        {
          id: 2,
          username: "彭XX3",
          address: "xx街道xx小区xx栋xxx号",
          tel: "18888888888"
        },
        {
          id: 3,
          username: "彭XX4",
          address: "xx街道xx小区xx栋xxx号",
          tel: "18888888888"
        },
        {
          id: 4,
          username: "彭XX5",
          address: "xx街道xx小区xx栋xxx号",
          tel: "18888888888"
        },
        {
          id: 5,
          username: "彭XX5",
          address: "xx街道xx小区xx栋xxx号",
          tel: "18888888888"
        }
      ],
      dialogVisible: false,
      addressForm:{
        contract_man: '',
        addr: '',
        contract_tel: ''
      },
      addAddressRules: {
        contract_man: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ],
        addr: [
          {required: true, message: '请输入收货地址', trigger: 'blur'}
        ],
        contract_tel:[
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: "请输入正确的手机格式"}
        ]
      }
    };
  },
  methods: {
    changeAddress(item) {
      this.addressForm = {
        contract_man: item.username,
        addr: item.address,
        contract_tel: item.tel
      }
      this.dialogVisible = true
    },
    delAddress(id) {
      // this.$message.error(username + "--" + id);
      this.$confirm("确认删除么？")
        .then(_ => {
          this.addressList.splice(id, 1);
        })
        .catch(_ => {
          this.$message.error("删除失败");
        });
    },
    preAddAddress(){
      this.addressForm = {
        contract_man: '',
        addr: '',
        contract_tel: ''
      }
      this.dialogVisible = true;
    },
    addAddress(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    
  }
};
</script>

<style scoped>
.address_blcok {
  background-color: #fff;
  min-height: 600px;
  padding: 20px 10px;
}
.address_blcok > .title {
  font-weight: 700;
  font-size: 18px;
  text-align: left;
  padding: 10px 0;
  border-bottom: 3px solid #409eff;
}

.address_blcok .address_list {
  text-align: left;
  padding: 20px 10px 0;
}

.address_blcok .address_add {
  height: 125px;
  width: 330px;
  background-color: #fff;
}

.address_item {
  /* margin: 0 auto; */
  /* float: left; */
  margin: 0 15px 20px 0;
  display: inline-block;
  position: relative;
  height: 125px;
  width: 300px;
  margin-bottom: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.address_item:hover {
  border: 1px solid #409eff;
}
.address_item > .address_item_name,
.address_item_address,
.address_item_tel {
  text-align: left;
  padding: 5px 0 0 10px;
  font-size: 18px;
}
.address_item > .address_item_btns {
  position: absolute;
  top: 10px;
  right: 10px;
}

.address_item > .address_item_address {
  padding: 35px 0 5px 10px;
  color: #666;
  font-size: 14px;
}

.address_item > .address_item_tel {
  color: #666;
  font-size: 16px;
}
.address_item > .address_item_btns > .el-button {
  color: rgb(170, 165, 165);
}
.address_item > .address_item_btns > .el-button:hover {
  color: #409eff;
}

.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
}
</style>

