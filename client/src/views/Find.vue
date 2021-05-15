<template>
    <div class="find">
       <mu-appbar class="header_title" style="width: 100%;" color="primary">
  <mu-button icon slot="left">
    <mu-icon value="menu"></mu-icon>
  </mu-button>
  Title

  <mu-button flat slot="right">LOGIN</mu-button>
</mu-appbar>

        <div class="content">
           
        </div>
    </div>
</template>

<script>


export default {
  name: "find",
  data() {
    return {
     
    };
  },

};
</script>
<style scoped>
.find {
  width: 100%;
  height: calc(100% - 55px);
  position: relative;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
}
</style>

