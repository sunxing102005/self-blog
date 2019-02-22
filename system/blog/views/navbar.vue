<template>
    <div>
        <header id="header" class="header bg-white">
            <div class="navbar-container">
                <a @click.prevent="$router.push('/content')" class="navbar-logo">Sunx</a>
                <div class="navbar-menu"><a>Archives</a><a>About</a><a>Links</a></div>
                <div class="navbar-search">
                    <span class="icon-search"></span>
                    <form id="search" method="post" action="/" role="search">
                        <span class="search-box"><input type="text" id="input" class="input" name="s" required="true" placeholder="Search..." maxlength="30" autocomplete="off" /></span>
                    </form>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
  name: 'navbar',
  computed: {
  },
  data(){
      return {
      }
  },
  created(){
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<style lang="less" >
.header {
    width: 84%;
    .navbar-container {
        width: 100%;
    }
}
</style>
