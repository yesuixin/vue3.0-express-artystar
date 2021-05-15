<template>
    <div class="circle">
        <mu-appbar class="header_title" style="width: 100%;" color="primary">
  <mu-button icon slot="left">
    <mu-icon value="menu"></mu-icon>
  </mu-button>
  Title
  <mu-button @click="$router.push('/publish')" flat slot="right">LOGIN</mu-button>
</mu-appbar>

    
      <div class="container-water-fall water-content">
    <waterfall :col="col"
               :data="data"
               @loadmore="loadmore">
      <template>
        <div class="cell-item"
             v-for="(item,index) in data"
             :key="index">
          <img  
              v-if="item.imgs"
               :src="item.imgs"
               alt="加载错误">
          <div class="item-body">
            <div class="van-multi-ellipsis--l2">{{item.text}}</div>


       <div class="item-footer">
                  <!-- <div class="avatar" :style="{backgroundImage : `url(${item.avatar})` }"></div> -->
                         <div class="name">{{item.name}}</div>
  
                        
          </div>

          </div>
        </div>
      </template>
    </waterfall>
    <loading :show="loading" />
  </div>
   
        </div>



</template>

<script>

import jwt_decode from "jwt-decode";
import loading from "@/components/load";

export default {
  name: "fcircle",
  data() {
    return {
       data: [],
      col: 2,
      loading: false,
    };
  },
  components: {
   loading
  },
  computed: {
    user() {
      const token = localStorage.wxToken;
      // 解析token
      const decode = jwt_decode(token);
      return decode;
    },
     itemWidth() {
      return 133 * 0.5 * (document.documentElement.clientWidth / 375);
    },
    gutterWidth() {
      return 10 * 0.5 * (document.documentElement.clientWidth / 375);
    }
  },
  created() {
    this.getLatestData();
  },
  methods: {
    getLatestData() {
     
      this.$axios("/api/moment/latest").then(res => {
        this.data=res.data;
       
      });
    },
    
    reset() {
      this.data = [];
    },
 
    switchCol(col) {
      this.col = col;
    },
 
    loadmore() {
      console.log(9999)
      this.loading = true;
      setTimeout(() => {
        this.data = this.data.concat(this.originData, this.originData);
        this.loading = false;
      }, 1000);
    }
  },
    mounted() {
    console.log('cascadeShow')
 
    this.data = this.originData;
  }

  
};  
</script>    

<style scoped>
  



.container-water-fall {

  box-sizing: border-box;
  &.water-content {
    margin: 0 15px;
  }
 
 
 
  .cell-item {
     border: 6px solid rgb(253, 253, 253);
    width: 100%;
    background: #ffffff;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top: 10px;
    img {
  
      width: 100%;
      height: auto;
      display: block;
    }
    .item-body {
     
      padding: 22px;
     
      .item-desc {
        font-size: 15px;
        color: #333333;
        line-height: 15px;
        font-weight: bold;
      }
   .item-footer {
        margin-top: 22px;
        position: relative;
        display: flex;
        align-items: center;
  
     
      } 
       .avatar { 
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .name {
          max-width: 150px;
          margin-left: 10px;
          font-size: 14px;
          color: #999999;
        }
        .star{
          margin-left: 50px;
        }
    }
  }
}
.githubdata {
  float: right;
  margin-right: 90px;
  img {
    width: 14px;

  }
}
</style>

  