<template>
  <div>
    <!-- <el-row>
      <el-col :span="2">
        <collapse-tool @click = "clickTool" :isActive='sidebar.collapse'></collapse-tool>
      </el-col>
      <el-col :span="7">
        <v-breadcrumb style="height:50px"></v-breadcrumb>
    </el-col>
    </el-row> -->
    <el-menu class="navbar" mode="horizontal">
      <collapse-tool  :isActive='sidebar.collapse' class="hamburger-container"></collapse-tool>
      <v-breadcrumb class="breadcrumb" ></v-breadcrumb>
      <el-dropdown  class="avatar-container" >
        <div class="avatar-wrapper">
          <span class="el-dropdown-link" >
            设置<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/welcome"><el-dropdown-item>首页</el-dropdown-item></router-link>
          <el-dropdown-item >
            <span @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import breadcrumb from '@/components/breadcrumb/index';
import collapseTool from '@/components/collapsetool/collapseTool';
export default {
  name: 'App',
   components:{
     collapseTool,
    'v-breadcrumb':breadcrumb
  },
  computed:{
    ...mapState({
        'sidebar':state=>state.app.sidebar
    }
    )
  },
  methods:{
    clickTool(){
      this.$store.commit('toggleSideBar');
    },
    logout(){
      this.$store.dispatch('FedLogOut').then(()=>{
        location.reload();
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .breadcrumb{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    float:left;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      transition:all 1s linear 50ms;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
    .avatar-wrapper:hover{
      color: aqua;
    }
  }
}
</style>
