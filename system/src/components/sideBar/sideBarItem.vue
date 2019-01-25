<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link v-if="item.children.length==1||item.single" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span>{{item.meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.path||item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span>{{item.meta.title}}</span>
        </template>
        <el-menu-item v-for=" child in item.children" :index="item.path+'/'+child.path">
          <sidebar-item v-if="child.children" :routes="[child]" :key="child.path" class="nest-menu">
          </sidebar-item>
          <router-link :to="item.path+'/'+child.path">
            <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
            <span>{{child.meta.title}}</span>
          </router-link>
        </el-menu-item>
      </el-submenu>
    </template>

  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SidebarItem',
  props:{
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    handleOpen(){

    },
    handleClose(){

    }
  }
}
</script>
<style>
.el-submenu,
.el-menu-item {
    text-align: left;
}
</style>
