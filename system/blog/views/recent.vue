<template>
    <div class="footer">
        <div class="footer-meta">
            <div class="footer-container">
                <div class="meta-item meta-copyright">
                    <div class="meta-copyright-info">
                        <a class="info-logo">
                            Sunx
                        </a>
                        <div class="info-text">
                            <p> Project created by <a href="https://thinkjs.org/" target="_blank">ThinkJS</a></p>
                            <p> Powered by <a href="https://github.com/sunxing102005/self_blog" target="_blank">SUNX</a></p>
                        </div>
                    </div>
                </div>
                <div class="meta-item meta-posts">
                    <h3 class="meta-title">RECENT POSTS</h3>
                    <li v-for="(item,index) in recent.content" :key="index">
                        {{item.title}}
                    </li>
                </div>
                <div class="meta-item meta-comments">
                    <h3 class="meta-title">RECENT COMMENTS</h3>
                    <li v-for="(item,index) in recent.comment" :key="index">
                        {{item.text}}
                    </li>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'recent',
  computed: {
  },
  data(){
      return {
          recent:window.recent
      }
  },
  created(){
  },
  mounted(){
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
  }
}
</script>

<style lang="less" scoped >
.footer-meta {
    margin-top: 0.3rem;
    border-top: 1px solid #e0e0e0;
}
</style>
