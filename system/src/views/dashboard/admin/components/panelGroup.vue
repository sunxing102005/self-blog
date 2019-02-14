<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="item-wrapper">
          <div class="icon-left icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="item-right">
            <div class="item-title">访问量</div>
            <count-to :startVal="0" :endVal="data.view" :duration="3000" class="card-num"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="item-wrapper">
          <div class="icon-left icon-message">
            <svg-icon icon-class="form" class-name="card-panel-icon" />
          </div>
          <div class="item-right">
            <div class="item-title">文章数</div>
            <count-to :startVal="0" :endVal="data.count" :duration="3000" class="card-num"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="item-wrapper">
          <div class="icon-left icon-message">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
          <div class="item-right">
            <div class="item-title">评论数</div>
            <count-to :startVal="0" :endVal="data.comments" :duration="3000" class="card-num"></count-to>
          </div>
        </div>
      </el-col>
      <!-- <el-col :xs="12" :sm="12" :lg="6">
        <div class="item-wrapper">
          <div class="icon-left icon-shoppingCard">
            <svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />
          </div>
          <div class="item-right">
            <div class="item-title">订单</div>
            <count-to :startVal="0" :endVal="1353" :duration="3000" class="card-num"></count-to>
          </div>
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
  import CountTo from 'vue-count-to'
   import { getContent} from '@/api/content'
    export default {
        name: "panelGroup",
      components:{
        CountTo
      },
      data(){
        return {
          data:{}
        }
      },
      created(){
        getContent({type:'summary'}).then(res=>{
          const data = res.data;
          this.data=data;
        })
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
    margin-top: 18px;
    .item-wrapper {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.05);
        &:hover {
            .icon-left {
                color: white;
            }
            .icon-people {
                background: #40c9c6;
            }
            .icon-message {
                background: #36a3f7;
            }
            .icon-money {
                background: #f4516c;
            }
            .icon-shoppingCard {
                background: #34bfa3;
            }
        }
        .icon-left {
            float: left;
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease;
            border-radius: 6px;
        }
        .icon-people {
            color: #40c9c6;
        }
        .icon-message {
            color: #36a3f7;
        }
        .icon-money {
            color: #f4516c;
        }
        .icon-shoppingCard {
            color: #34bfa3;
        }
        .item-right {
            float: right;
            margin: 26px;
            margin-left: 0px;
            font-weight: bold;
            .item-title {
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                margin-bottom: 12px;
            }
            .card-num {
                font-size: 20px;
            }
        }
        .card-panel-icon {
            float: left;
            font-size: 48px;
        }
    }
}
</style>
