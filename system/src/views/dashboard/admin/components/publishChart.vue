<template>
  <div :class="className" :style="{height:height,width:width}" ref="myEchartPub">
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
        name: "publishChart",
      data() {
        return {
          chart: null,
          xAxisData:[],
          seriesData:[]
        }
      },
      mounted(){
        getContent({'type': 'archives'}).then(res=>{
           let monthsData = {};
        let xAxisData = [];
        let seriesData = [];
        let max = 10;
        for (let i in res.data) {
          let date = new Date(res.data[i].create_time * 1000);
          let key = date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
          monthsData[key] = monthsData[key] ? monthsData[key] + 1 : 1;
          if (monthsData[key] > max) {
            max = monthsData[key];
          }
        }
        let date = new Date();
        let nearThree = [];
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        for (let i = 11; i >= 0; i--) {
          let key;
          if (month - i > 0) {
            key = year + '-' + ((month - i) > 9 ? (month - i) : '0' + (month - i));
          } else {
            key = (year - 1) + '-' + ((month - i + 12) > 9 ? (month - i + 12) : '0' + (month - i + 12));
          }
          xAxisData.push(key);
          seriesData.push(monthsData[key] ? monthsData[key] : 0);
        }
        this.xAxisData = xAxisData;
        this.seriesData = seriesData;
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
          this.chart = echarts.init(this.$refs.myEchartPub,'infographic')
          // 把配置和数据放这里
          this.chart.setOption({
            color: ['#4472C5'],
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
              data: ['发布量']
            },
            xAxis: [
              {
                type: 'category',
                data: this.xAxisData,
                axisPointer: {
                  type: 'shadow'
                }
              }],
            yAxis: [
              {
                type: 'value',
                name: '数量',
                axisLabel: {
                  formatter: '{value} 个'
                }
              }],
            series: [
              {
                name: '发布量',
                type: 'bar',
                itemStyle:{
                    normal:{
                      // color:'#40c9c6'
                    }
                },
                data: this.seriesData
              }]
          })
        }
      }

    }
</script>

<style scoped>
</style>
