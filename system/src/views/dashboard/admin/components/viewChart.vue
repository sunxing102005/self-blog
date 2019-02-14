<template>
  <div :class="className" :style="{height:height,width:width}" ref="myEchart">
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { getContent} from '@/api/content'
    export default {
      props: {
        className: {
          type: String,
          default: 'chart'
        },
        width: {
          type: String,
          default: '100%'
        },
        height: {
          type: String,
          default: '280px'
        },
        autoResize: {
          type: Boolean,
          default: true
        },
        chartData: {
          type: Object
        }
      },
        name: "echart",
      data() {
        return {
          chart: null,
          xAxis:[],
          series:[]
        }
      },
      mounted(){
          getContent({type:'hot'}).then(res=>{
              const data = res.data;
              data.forEach(item=>{
                //    this.xAxis.push(item.title);
                  this.xAxis.push(item.title.length>7?item.title.substring(0,7)+'...':item.title);
                  this.series.push(item.view);
              })
              this.initChart();
          })
        
      },
      beforeDestory(){
        if (!this.chart) {
          return
        }
        this.chart.dispose();
        this.chart = null
      },
      methods:{
        initChart() {
          this.chart = echarts.init(this.$refs.myEchart,'infographic')
          // 把配置和数据放这里
          this.chart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                // magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: false },
                saveAsImage: { show: false }
              }
            },
            legend: {
              data: ['访问量']
            },
            xAxis: [
              {
                type: 'category',
                data: this.xAxis,
                axisPointer: {
                  type: 'shadow'
                }
              }],
            yAxis: [
              {
                type: 'value',
                name: '访问量',
              }],
            series: [
              {
                name: '访问量',
                type: 'bar',
                itemStyle:{
                    normal:{
                      color:'#40c9c6'
                    }
                },
                data: this.series
              }]
          })
        }
      }

    }
</script>

<style scoped>
</style>
