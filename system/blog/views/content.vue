<template>
    <div id="content" class="container">
        <div class="article-container" v-for="(item,index) in list" :key="index">
            <div class="content-left">
                <div class="title">{{item.title}}</div>
                <div class="description" v-html="item.description"></div>
                <div class="bottom">
                    作者{{item.user.username}} 发布时间 {{item.create_time}} 阅读量 {{item.view}}
                </div>
            </div>
            <div class="thumb-container"></div>
        </div>
        <ul class="page">
            <li class="pointer left" @click="toPage('last')" v-show="currPage!=1">←</li>
            <li class="num">{{currPage+'/'+total}}</li>
            <li class="pointer left" @click="toPage('next')" v-show="currPage!=total">→</li>
        </ul>
    </div>
</template>

<script>
import {getList} from '../api/content';
export default {
  name: 'content',
  data(){
      return {
          list:[],
          total:1,
          currPage:1
      }
  },
  created(){
      this.getData(1);
  },
  methods:{
      getData(page){
          getList({page}).then(res=>{
              this.list = res.data.content.data;
              this.total = res.data.content.totalPages;
              this.currPage = res.data.content.currentPage;
                console.log('data',res.data);
          })
      },
      toPage(type){
          const targe  = (type=='last'?(this.currPage-1):(this.currPage+1));
          this.getData(targe);
      }
  }
}
</script>

<style <style lang="less">
.container {
    font-family: "Courier New", Courier, monospace;
    font-size: 0.14rem;
    display: flex;
    flex-direction: column;
    .article-container {
        flex: 1 0 3rem;
        width: 100%;
        padding: 0.3rem 10% 0.3rem 10%;
        text-align: left;
        display: flex;
        .content-left {
            // display: inline-block;
            flex: 0 0 80%;
            width: 60%;
            height: 2.4rem;
            .title {
                font-weight: 500;
                font-size: 0.18rem;
                color: #212121;
            }
            .description {
                width: 90%;
            }
        }
        .thumb-container {
            // display: inline-block;
            flex: 1;
            // width: 15%;
            height: 2.4rem;
        }
    }
    .page {
        width: 100%;
        height: 0.4rem;
        text-align: center;
        font-size: 0.18rem;
        list-style: none;
        li {
            display: inline-block;
            height: 0.3rem;
            line-height: 0.3rem;
            width: 0.5rem;
        }
        .pointer {
            color: #5f5f5f;
            cursor: pointer;
        }
        .num {
            color: #6fa3ef;
            // line-height: 0.34rem;
        }
    }
}
</style>
