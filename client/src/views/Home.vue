<!--
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-17 16:46:53
 * @,@LastEditTime: ,: 2020-11-20 21:54:56
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \client\src\views\Home.vue
 -->
<template> 
  <div class="home">
       <router-view></router-view>
        
  <div id="nav">
 <mu-container style="max-width: 414px; width:100%; ">
  <mu-bottom-nav :value.sync="shift" shift>
   <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video" to="/wchart"></mu-bottom-nav-item>
    <mu-bottom-nav-item value="music" title="Music" icon="music_note" to="/abook"></mu-bottom-nav-item>
    <mu-bottom-nav-item value="books" title="Books" icon="books" to="/find"></mu-bottom-nav-item>
    <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo" to="/mine"></mu-bottom-nav-item>
  </mu-bottom-nav>
</mu-container>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
   data () {
    return {
      shift: 'movies'
    }
  },
  components: {
    HelloWorld
  }
}
</script>
<style>

#nav {
  
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 1000;
}
</style>