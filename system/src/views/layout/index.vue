<template>
  <div id="app">
    <el-container  class="container" :class="{hideSidebar:!sidebar.collapse}">
      <el-aside  style="width:0px">
        <side-bar class="sidebar-container"></side-bar>
      </el-aside>
      <el-main class="main-container">

        <topbar class="topRouter"></topbar>
        <router-view ></router-view>

      </el-main>
    </el-container>
  </div>
</template>

<script>

  // import menu from './components/menu';
  import sideBar from '@/components/sideBar';
  import breadcrumb from '@/components/breadcrumb/index';
  import topbar  from '@/components/topbar/topbar';

  // import svgicon from './icons'
  import { mapState } from 'vuex'
  export default {
    name: 'layout',
    components:{
      // 'v-menu': menu,
      sideBar,
      'v-breadcrumb':breadcrumb,
      topbar
    },
    computed:{
      ...mapState({
          'sidebar':state=>state.app.sidebar
        }
      )
    }
  }
</script>

<style>
  .topRouter{
    height: 50px;
    width: 100%;

  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;

  }
  .container{
    position: relative;
    width: 100%;
    height: 100%

  }
  .sidebar-container{

  }
</style>
