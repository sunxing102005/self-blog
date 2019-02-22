<template>
    <div class="page-container">
        <blog-navbar></blog-navbar>
        <div class="title">{{content.title}}</div>
        <div class="time">发布日期 {{content.create_time|timeFilter}}</div>
        <div class="tags">
            <div class="tag" v-for="(item,index) in content.tag" :key="index">
                # {{item.name}}
            </div>
            <div class="view"> </div>
        </div>
        <div class="content" v-html="content.content"></div>
        <div class="copyright">
            <div>本文由Sunx创作，采用知识共享署名4.0国际许可协议进行许可 </div>
            <div>本站文章除注明转载/出处外，均为本站原创或翻译，转载前请务必署名</div>
            <div>最后编辑时间 {{content.modify_time|timeFilter}}</div>
        </div>
        <comment :comments="content.comment" @addComment="getData({slug:$route.query.slug})"></comment>
        <recent></recent>
    </div>
</template>

<script>
import {getDetail} from '../api/content';
import { mapGetters } from 'vuex';
import comment from './comment';
import recent from './recent';
import navbar from './navbar';
export default {
  name: 'page',
      computed: {
        ...mapGetters(['slug'])
    },
  data(){
      return {
          title:'',
          content:{
              modify_time:''
          },
      }
  },
    components:{comment,recent,'blog-navbar':navbar},
  created(){
      this.getData({slug:this.$route.query.slug})
  },
    filters:{
      timeFilter(val){
          if(val){
            const time = new Date(val*1000);
            const year = time.getFullYear();
            const month = time.getMonth()+1;
            const day = time.getDate();
            return `${day},${month},${year}`;
          }else{
              return ''
          }
          
      }
  },
  methods:{
      getData(params){
          getDetail(params).then(res=>{
              this.content = res.data.content;

          })
      }
  }
}
</script>

<style lang="less"  >
.page-container {
    width: 100%;
    height: 100%;
    text-align: left;
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    padding: 10% 8% 0 8%;
    font-size: 0.16rem;
    .title {
        font-size: 0.22rem;
        color: #222;
        font-weight: 600;
    }
    .time {
        color: #999;
    }
    .tags {
        font-size: 0.14rem;
        border-bottom: 1px solid #e0e0e0;
        .tag {
            display: inline-block;
            margin-right: 0.05rem;
            margin-bottom: 0.05rem !important;
            color: #017e66;
            background-color: rgba(1, 126, 102, 0.08);
            height: 0.22rem;
            line-height: 0.22rem;
        }
        .view {
            display: inline-block;
            color: #999;
        }
    }
    .copyright {
        text-align: left;
        font-size: 14px;
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        padding: 25px 0px 20px;
    }
}
</style>
