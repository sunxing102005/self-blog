<template>
  <!-- <scroll-bar> -->
    <el-menu mode="vertical" class="menu" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
       <sidebar-item :routes="permission_routers"></sidebar-item>
      <!--<sidebar-item :routes='constRout'></sidebar-item>-->
    </el-menu>
  <!-- </scroll-bar> -->
</template>

<script>
import { mapGetters,mapState } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  name:'sideBar',
  computed: {
    ...mapState({
        'sidebar':state=>state.app.sidebar,
        'constRout':state=>{
          return state.app.constRout
        }

    }),
    ...mapGetters(['permission_routers']),
    isCollapse() {
      return !this.sidebar.collapse
    }
  }
}
</script>
<style>

</style>
