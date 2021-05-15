<template>
    <div>
       <mu-appbar class="header_title" style="width: 100%;" color="primary">
  <mu-button icon slot="left">
    <mu-icon value="menu"></mu-icon>
  </mu-button>
  Title
  <mu-button @click="$router.push('/publish')" flat slot="right">LOGIN</mu-button>
</mu-appbar>
        我
    </div>
</template>

<script>


export default {
  name: "mine",

};
</script>