<template>
  <div id="product_block">
    <div class="title">商品管理
      <el-button class="addProduct_btn" type="success" @click="preAddProduct">增加商品</el-button>
    </div>
    <div class="product_list" v-loading="loading">
      <div v-if="productList.length == 0" class="product_item">暂无数据</div>
      <div class="product_item" v-for="product in productList" :key="product.id">
        <div class="imgDiv">
          <img :src="product.photo_addr" alt>
        </div>
        <div class="product_main">
          <div class="product_name">{{product.name}}</div>
          <!-- <div class="product_sale">月售:{{product.product_sale}}</div> -->
          <div class="product_sale">月售: 0</div>
          <div class="product_price">￥{{product.price}}</div>
          <el-button class="product_btn" type="danger" @click="delProduct(product)">删除</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="请输入新的商品信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="productForm"
        status-icon
        :rules="addProductRules"
        ref="productForm"
        label-width="100px"
      >
        <el-form-item label="商品名称" prop="product_name">
          <el-input type="text" v-model="productForm.product_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="product_price">
          <el-input type="text" v-model="productForm.product_price"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            name="imageFile"
            class="avatar-uploader"
            action="/idea/uploadImage"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="addProduct('productForm',productForm)">添加</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "merchant_product",
  created() {
    this.getProductList();
  },
  data() {
    return {
      // 缓冲效果开关
      loading: true,
      // 弹出框弹出开关
      dialogVisible: false,
      // 弹出框图片显示地址
      imageUrl: "",
      // 上传图片暂存名
      postImgUrl: "",
      // 产品列表
      productList: [
        // {
        //   id: 0,
        //   product_name: "肉+菜+饭+水..",
        //   product_sale: 24,
        //   product_price: 8
        // },
        // {
        //   id: 1,
        //   product_name: "肉+菜+饭+水..",
        //   product_sale: 212,
        //   product_price: 9
        // },
        // {
        //   id: 2,
        //   product_name: "肉+菜+饭+水..",
        //   product_sale: 12,
        //   product_price: 10.5
        // },
        // {
        //   id: 3,
        //   product_name: "肉+菜+饭+水..",
        //   product_sale: 75,
        //   product_price: 12
        // }
      ],
      productForm: {
        product_name: "",
        product_price: ""
      },
      addProductRules: {
        product_name: [
          { required: true, message: "商品名称不可为空", trigger: "blur" }
        ],
        product_price: [
          { required: true, message: "商品价格不可为空", trigger: "blur" },
          {
            pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
            message: "格式错误"
          }
        ]
      }
    };
  },
  methods: {
    // 获取商家现有的所有商品
    getProductList() {
      this.loading = true;
      let url = "/idea/listAllProduct";
      this.$http
        .get(url, {
          params: {
            mid: this.$session.get("mid")
          }
        })
        .then(res => {
          console.log(res);
          this.productList = res.data.productList;
          this.loading = false;
        });
    },
    // 删除商品
    delProduct(item) {
      console.log(item.id);
      this.$confirm("确认删除").then(_ => {
        // 请求后台删除商品后台
        let url = "/idea/deleteProduct";
        this.$http
          .get(url, {
            params: {
              id: item.id
            }
          })
          .then(res => {
            console.log(res);

            if (res.data.message == "删除成功") {
              this.$message({
                type: "success",
                message: res.data.message
              });
              let index = this.productList.findIndex(el => el.id == item.id);
              this.productList.splice(index, 1);
            } else {
              this.$message.error(res.data.message);
            }

          });
      });
    },
    // 点击增加商品按钮
    preAddProduct() {
      this.dialogVisible = true;
      this.productForm = {
        product_name: "",
        product_price: ""
      };
    },
    // 添加商品
    addProduct(formName, data) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.imageUrl == "") {
            this.$message.error("请上传商品图片");
          } else {
            // 添加商品
            let url = "/idea/addProduct";
            this.$http
              .get(url, {
                params: {
                  mid: this.$session.get("mid"),
                  name: data.product_name,
                  price: data.product_price,
                  photo_addr: this.postImgUrl
                }
              })
              .then(res => {
                console.log(res);

                // const item = {
                //   id: 0,
                //   product_name: data.product_name,
                //   product_sale: 0,
                //   product_price: data.product_price
                // };
                // this.productList.push(item);
                this.dialogVisible = false;
                if (res.data.message == "添加成功") {
                  this.$message({
                    type: "success",
                    message: res.data.message
                  });
                } else {
                  this.$message.error(res.data.message);
                }
                this.getProductList();
              })
              .catch(error => {
                console.log("出错了");
              });

            // const item = {
            //     id: 11,
            //     product_name: 11,
            //     product_price: 22,
            // }
            // this.productList.push(item);
            this.imageUrl = "";
          }
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.imageUrl = "";
          done();
        })
        .catch(_ => {});
    },

    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = "http://localhost:8081/upload/images/" + res.fileName;
      this.postImgUrl = res.fileName;
    },
    beforeAvatarUpload(file) {
      const isJP = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJP) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJP && isLt2M;
    },

    // 取消添加
    close() {
      this.dialogVisible = false;
      this.imageUrl = "";
    }
  }
};
</script>

<style scoped>
#product_block {
  background-color: #fff;
  min-height: 600px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 10px;
  text-align: left;
}
#product_block > .title {
  font-weight: 700;
  font-size: 18px;
  text-align: left;
  padding: 10px 0;
  border-bottom: 3px solid #409eff;
  margin-bottom: 10px;
}
#product_block .addProduct_btn {
  float: right;
  margin-top: -10px;
}
#product_block > .product_list {
  text-align: left;
  width: 100%;
  margin: 0 0 0 10px;
  box-sizing: border-box;
}
.product_list .product_item {
  width: 350px;
  display: inline-block;
  margin: 0 0 5px 0;
  padding: 0 10px 0 0;
}
.product_item .imgDiv {
  width: 145px;
  float: left;
}
.product_item .imgDiv img {
  width: 145px;
  height: 145px;
  vertical-align: top;
}
.product_item .product_main {
  position: relative;
  padding-left: 10px;
  margin-left: 145px;
  height: 145px;
  border: 1px solid #409eff;
  border-radius: 0 5px 5px 0;
  border-left: 0;
  box-sizing: border-box;
}

.product_main .product_name {
  padding: 10px 0;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product_main .product_sale {
  font-size: 18px;
  padding: 10px 0;
  color: #999;
}
.product_main .product_price {
  color: #f74342;
  font-size: 24px;
  font-weight: 700;
  padding: 15px 0 0 0;
}
.product_main .product_btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 89px;
  height: 89px;
  line-height: 89px;
  text-align: center;
  border: 3px dashed #999;
}
.avatar {
  width: 89px;
  height: 89px;
  display: block;
}
</style>

