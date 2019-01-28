<template>
    <div id="content">
        <div class="article-container" v-for="(item,index) in list" :key="index">
            <div class="title"></div>
            <div class="description"></div>
            <div class="bottom"></div>
        </div>
    </div>
</template>

<script>
import {getList} from '../api/content';
export default {
  name: 'content',
  data(){
      return {
          list:[]
      }
  },
  created(){
      this.getData();
  },
  methods:{
      getData(){
          getList().then(res=>{
              this.list = res.data.content.data;
          })
      }
  }
}
</script>

<style <style lang="less">
.container {
    font-family: "Courier New", Courier, monospace;
    .article-container {
    }
}
</style>
