<template>
  <div>
    <component :is="currClass"></component>
  </div>
</template>

<script>
  import adminDashboard from './admin/index';
  import editorDashboard from './editor/index';
  import {mapGetters} from 'vuex'
    export default {
        name: "dashboard" ,
      components: { adminDashboard, editorDashboard },
      data(){
          return {
            currClass:''
          }
      },
      computed:{
        ...mapGetters(['roles']  )
      },
      created(){
          if(this.roles.indexOf('admin')!=-1){
            this.currClass = 'adminDashboard'
          }else {
            this.currClass = 'editorDashboard';
          }
      }
    }
</script>

<style scoped>
</style>
