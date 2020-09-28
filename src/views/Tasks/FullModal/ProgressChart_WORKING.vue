<template>
  <div>
    Chart
    <chartist
        ratio="ct-major-second"
        type="Line"
        :data="chartData"
        :options="chartOptions" >
    </chartist>
    
  </div>
</template>

<script>
// import Chartist from 'chartist'
// import VueChartist from 'vue-chartist'

export default {
  components: {
    // VueChartist
  },
  props: {
    favorites: Number,
    unstarted: Number,
    started: Number,
    completed: Number,
  },
  data(){
    return{
        chartData: {
            labels: ["A", "B", "C"],
            series:[[1, 3, 2], [4, 6, 5]]
        },
        chartOptions: {
            lineSmooth: false
        },
      options: {
        fullWidth: true,
        chartPadding: {
          right: 40
        }
      }
    }
  },
}
</script>