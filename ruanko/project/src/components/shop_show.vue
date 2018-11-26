<template>
<div class="outer">
 <div class="shop">
   <h1>{{router.params.typeName}}</h1>    
      <!-- <img  src="..\assets\images\111.png" class="image"> -->
<!-- <el-row :gutter="20">
  <el-col v-for="todo in todos" :key="todo.id" :span="6"  ><div class="grid-content bg-purple">    <el-card :body-style="{ padding: '0px' }">

      <img  v-bind:src="todo.src" class="image">
      <div style="padding: 14px;">
        
        <div class="bottom clearfix">
          <span id="shop_name" > {{todo.shop_name}}</span><br><span>&nbsp;</span><br>
          <div>
            <span><time class="time">{{ currentDate }}</time></span>
            <el-rate
              v-model="value5"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
              id="pingfen">
            </el-rate>
            <span id="sale">销量：{{todo.sale}}</span>
            <el-button type="primary" round id="to_shop">去看看</el-button>
          </div>
        </div>
      </div>
    </el-card></div></el-col>
</el-row> -->
</div>
 </div>
</template>

<script>
// import { setName, getName } from "@/util/auth";
// import bn from "../assets/images/111.png";
import router from "../router";
export default {
  data() {
    return {
      msg: "home",
      value5: 3.7,
      todos: [
        {
          id: 1,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        },
        {
          id: 2,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        },
        {
          id: 3,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        },
        {
          id: 4,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        },
        {
          id: 5,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        },
        {
          id: 6,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        },
        {
          id: 7,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        },
        {
          id: 8,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        },
        {
          id: 9,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        },

        {
          id: 10,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        },
        {
          id: 11,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        },
        {
          id: 12,
          src: bn,
          shop_name: "约吃潮汕",
          sale: 100
        }
      ]
    };
  },

  methods: {
    clicked() {
      this.$bus.$emit("test", "aaaaa");
      this.$store.dispatch("user/Login", {
        name: "a",
        password: "asd"
      });
      console.log(getName());
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  margin-top: 20px;
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.time {
  font-size: 20px;
  color: #999;
}

.bottom {
  margin-top: 10px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 80%;
  display: block;
  margin: 0 auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

#shop_name {
  font-family: Cursive;
  font-weight: bold;
  font-size: 40px;
}

#sale {
  position: relative;
  left: -65px;
  top: 0px;
}

#to_shop {
  position: relative;
  left: 80px;
  top: 0px;
}
#pingfen {
  position: relative;
  left: -85px;
  top: 0px;
}

div.outer {
  overflow: hidden;
  background: #ddd;
  height: 800px;
}
div.shop {
  overflow-x: hidden;
  overflow-y: scroll;
  /* padding-right: 15px; */
  /* content: '移动端不用注释此行， pc端需要注释掉本行'; */
  margin-right: -30px;
  height: 800px;
}
</style>
