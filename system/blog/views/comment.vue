<template>
    <div class="comment-container">
        <span class="response">评论<a v-show="parent_id!=0" @click.prevent="cancelReply"> /回复</a></span>
        <div method="post" class="comment-form" role="form">
            <input type="text" v-model="comment.author" maxlength="12" class="form-control input-control clearfix" placeholder="Name (*)" value="" required>
            <input type="email" v-model="comment.email" class="form-control input-control clearfix" placeholder="Email (*)" value="" required>
            <input type="url" v-model="comment.url" class="form-control input-control clearfix" placeholder="Site (http://)" value="">
            <textarea v-model="comment.text" id="textarea" class="form-control" placeholder="Your comment here. Be cool. " required></textarea>
            <button @click="addComment" class="submit" id="misubmit">SUBMIT</button>
            <input type="hidden" name="_t" id="_t" value="">
        </div>
        <div class="comment-body comment-parent comment-odd">
            <div v-for="(item,index) in comments" :key="index" class="comment-view">
                <div class="comment-header">
                    <img class="avatar" src="https://secure.gravatar.com/avatar/80016cc37e2ea068f978cbb693471fac?s=80&r=G&d=" width="40px" height="40px" />
                    <span class="comment-author">{{item.author}}</span>
                </div>
                <div class="comment-content">
                    <span class="comment-author-at">{{item.parent?'@'+item.parent.author:''}}</span>
                    <p>{{item.text}}</p>
                </div>
                <div class="comment-meta"> <time class="comment-time">{{item.create_time|timeFilter}}</time>
                    <span class="comment-reply">
                        <a @click.prevent="reply(item.id)">Reply</a>
                    </span>
                </div>
            </div>
        </div>
        <!-- <div v-for="(item,index) in comments" :key="index" class="comment-view">
            <span class="comment-author">{{item.author}}</span>
        </div> -->
    </div>
</template>

<script>
import {pubComment} from '../api/content';
import { mapGetters } from 'vuex';
export default {
  name: 'comment',
      computed: {
    },
    props:{
        comments: {
            type: Array,
            default: ()=>[]
        }
        },
  data(){
      return {
          comment:{
              author:'',
              email:'',
              url:'',
              content:''
          },
          parent_id:0
      }
  },
  created(){
  },
  mounted(){
      console.log('sss',this.comments);
  },
    filters:{
      timeFilter(val){
          const time = new Date(val*1000);
          const year = time.getFullYear();
          const month = time.getMonth()+1;
          const day = time.getDate();
          return `${day},${month},${year}`;
      }
  },
  methods:{
      addComment(){
          pubComment({...this.comment,slug:this.$route.query.slug,parent_id:this.parent_id}).then(res=>{
            this.clearComment();
          if(this.parent_id!=0){
              this.parent_id=0;
          }
              this.$emit('addComment');

          })
      },
      clearComment(){
            this.comment ={
              author:'',
              email:'',
              url:'',
              content:'',
              parent_id:''
          };
      },
      cancelReply(){
          this.parent_id=0;
          this.clearComment();
      },
      reply(parent_id){
         this.clearComment();
        this.parent_id = parent_id;
        //      pubComment({...this.comment,slug:this.$route.query.slug,parent_id}).then(res=>{
        //       this.comment ={
        //       author:'',
        //       email:'',
        //       url:'',
        //       content:'',
        //       parent_id:''
        //   };
        //       this.$emit('addComment');
        //   })
      }
  }
}
</script>

<style lang="less" scoped >
.comment-container {
    padding: 0.3rem 0 0.3rem 0;
    .response {
        font-size: 0.15rem;
        font-weight: 400;
        display: block;
        padding: 30px 0 30px 20px;
        color: #5f5f5f;
    }
    .comment-parent {
        background: transparent;
        .comment-view {
            background: white;
            margin-bottom: 20px;
        }
    }
}
</style>
