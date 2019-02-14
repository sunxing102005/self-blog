<template>
    <div class="dashboard-editor-container">
        <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin: 40px 0 32px 0">
            <view-chart></view-chart>
        </el-row>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin: 40px 0 32px 0">
            <publish-chart></publish-chart>
            <!-- ..... -->
        </el-row>
    </div>
</template>

<script>
  import PanelGroup from './components/panelGroup'
  import echart from './components/echart'
  import viewChart from './components/viewChart'
  import publishChart from './components/publishChart'
//   const lineChartData = {
//     newVisitis: {
//       expectedData: [100, 120, 161, 134, 105, 160, 165],
//       actualData: [120, 82, 91, 154, 162, 140, 145]
//     },
//     messages: {
//       expectedData: [200, 192, 120, 144, 160, 130, 140],
//       actualData: [180, 160, 151, 106, 145, 150, 130]
//     },
//     purchases: {
//       expectedData: [80, 100, 121, 104, 105, 90, 100],
//       actualData: [120, 90, 100, 138, 142, 130, 130]
//     },
//     shoppings: {
//       expectedData: [130, 140, 141, 142, 145, 150, 160],
//       actualData: [120, 82, 91, 154, 162, 140, 130]
//     }
//   }
  export default {
    name: 'adminDashboard',
    components: {
      PanelGroup,
      echart,
      viewChart,
      publishChart
    },
    data() {
      return {
        // lineChartData: lineChartData.newVisitis
      }
    },
    methods: {
      handleSetLineChartData(type) {
        // this.lineChartData = lineChartData[type]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
}
</style>
