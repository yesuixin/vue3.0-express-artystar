<template>
    <div class="register">
        <div class="header">
            <button @click="$router.go(-1)">取消</button>
        </div>
        <div class="container">
            <div class="title">注册账户</div>
            <div class="content">
                <!-- 表单 -->
                <form>
                  <mu-text-field 
                v-model="user.name"
                 label='昵称' 
                 label-float help-text="请填写名称" 
                 icon="account_circle">
                 </mu-text-field>
                    <mu-text-field 
                 v-model="user.email" 
                 label='账号' 
                 label-float help-text="请填写邮箱" 
                 icon="account_circle">
                 </mu-text-field>
                 <mu-text-field 
                 v-model="user.password"
                 label="Password" 
                 label-float 
                 error-text="请输入密码" 
                 icon="locked"></mu-text-field>

                </form>
                <div class="btn_wrap">
                    <mu-button color="success"   
                    @click="registerClick">
                    Login</mu-button>
                 
              </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
  name: "register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        identity : "consumer",
  
      }
    };
  },

  
  methods: {
    registerClick(event) {
      this.$axios.post("/api/users/register", this.user).then(res => {
        // 注册成功
        alert("注册成功");
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 50px;
}
.header button {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  color: #20af0e;
}
.container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.title {
  margin-top: 30px;
  font-size: 22px;
  text-align: center;
}
.content,
.btn_wrap {
  margin-top: 30px;
}
</style>
