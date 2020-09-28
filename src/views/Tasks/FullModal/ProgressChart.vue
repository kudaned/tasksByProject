<template>
  <div>
    <canvas 
      id="myChart" 
      width="400" 
      height="250"
    >
    </canvas>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Chart from 'chart.js'

export default {
  props: {
    favorites: Number,
    unstarted: Number,
    started: Number,
    completed: Number,
    arrayId: {
      type: Number,
      required: false
    }
  },
  data(){
    return{
      chartData: this.fetchData
    }
  },
  computed: {
    ...mapState({
      allProjectsData: state => state.projects.projectsData
    }),
    ...mapGetters('projects', [
      'unstartedTasksLength',
      'startedTasksLength',
      'completedTasksLength',
      'favoriteTasksLength',
      'archivedTasksLength'
    ]),
  },
  watch: {
    arrayId: function(){
      this.refereshChart()
    },
    allProjectsData: function(){
      this.refereshChart()
    }
  },
  mounted() {
    this.createChart()
  },
  methods: {
    refereshChart(){
      var chart = this.createChart()
      chart.destroy()
      this.createChart()
    },
    createChart() {
      var ctx = document.getElementById("myChart")
      var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Up Next", "In Progress", "Priority", "Done"],
          datasets: [{
            label: "# of tasks",
            data: [
              this.unstartedTasksLength(this.arrayId), 
              this.startedTasksLength(this.arrayId), 
              this.favoriteTasksLength(this.arrayId), 
              this.completedTasksLength(this.arrayId)
            ],
            borderColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)"
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)"
            ],
            borderWidth: 1
          }]
        },
        options: {
          cutoutPercentage: 50,
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
        }
      });
      return myChart
    }
  }
};
</script>