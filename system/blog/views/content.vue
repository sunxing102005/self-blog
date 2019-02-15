<template>
    <div class="container">
        <blog-navbar></blog-navbar>
        <div class="article-container" v-for="(item,index) in list" :key="index">
            <div class="content-left" @click="toArticle(item.slug)">
                <div class="title">{{item.title}}</div>
                <div class="description" v-html="item.description"></div>
                <div class="bottom">
                    阅读量 <span class="view-font">{{item.view}} </span> <span class="author">作者 sunx 发布时间 </span>
                </div>
            </div>
            <div class="thumb-container"></div>
        </div>
        <ul class="page">
            <li class="to-page" @click="toPage('last')" v-show="currPage!=1">←</li>
            <li class="num">{{currPage+'/'+total}}</li>
            <li class="to-page" @click="toPage('next')" v-show="currPage!=total">→</li>
        </ul>
        <recent></recent>
    </div>
</template>

<script>
import {getList} from '../api/content';
import navbar from './navbar';
import {  mapMutations } from 'vuex';
import recent from './recent';
export default {
  name: 'list',
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
  components:{
      'blog-navbar':navbar,recent
  },
  filters:{
      timeFilter(val){
          const time = new Date(val);
          const year = time.getFullYear();
          const month = time.getMonth()+1;
          const day = time.getDate();
          return `${day},${month},${year}`;
      }
  },
  methods:{
       ...mapMutations(['setSlug']),
      toArticle(slug){
          this.setSlug(slug);
          this.$router.push({
              path:'/article',
              query: {slug}
          });
      },
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


 <style lang="less">
.container {
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    font-size: 0.16rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 10% 8% 0 8%;
    .article-container:not(:nth-child(2)) {
        margin-top: 0.5rem;
    }
    .article-container {
        flex: 1 1;
        width: 100%;
        padding: 0.3rem 0 0.3rem 0.2rem;
        text-align: left;
        display: flex;
        &:hover {
            background-color: aliceblue;
        }
        .content-left {
            // display: inline-block;
            cursor: pointer;
            flex: 0 0 80%;
            width: 60%;
            // height: 2.4rem;
            .title {
                font-weight: 500;
                font-size: 0.22rem;
                color: #212121;
            }
            .description {
                width: 90%;
                min-height: 2rem;
            }
            .bottom {
                position: relative;
                .view-font {
                    color: #017e66;
                }
                .author {
                    right: 0;
                    position: absolute;
                }
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
        .to-page {
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
