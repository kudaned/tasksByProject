<template>
  <!-- color="grey lighten-4" -->
  <v-card 
    color="red lighten-5"
  >
    <v-card-text>
      <!-- PRIORITY DROPDOWN -->
      <div class="mb-3">

        <h2>
          <Badge label="Top Priorities" :number="todaysData.length" />
        </h2>

        <v-col class="d-flex" cols="12" md="4" sm="6">

          <v-select
            v-model="feature"
            :items="features"
            label="field"
            solo
          ></v-select>

        </v-col>
      </div>


      <!-- TOPS -->
      <v-row class=" ">
        <div class="mx-5">

          <v-row>
            <v-col v-for="(task, task_idx) in projectData()" :key="`today_${task_idx}`" cols="12" md="4" class="">

              <PriorityCard 
                :task="task" 
                icon="mdi-star" 
                cardColor="red"
              />

            </v-col>
          </v-row>
        </div>
      </v-row>

    </v-card-text>
  </v-card>
    
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Badge from "@/components/Badge"
import PriorityCard from "@/views/Tasks/Common/Cards/PriorityCardCompact"

const TOPS = 'tops'
const COMMENTS = 'comments'

export default {
  components: {
    Badge,
    PriorityCard
  },
  data(){
    return{
      feature: TOPS,
      features: [
        { text: 'Tops', value: TOPS },
        { text: 'Comments', value: COMMENTS }
      ],
      things: {}
    }
  },
  computed: {
    ...mapState({
      todaysData: state => state.tasks.todaysData
    }),
  },
  methods: {
    ...mapActions('tasks', ['actionFetchTodays']),
    projectData(){
      let data = []
      if(this.feature === TOPS)
        data = this.todaysData
      else if(this.feature === COMMENTS)
        data = []

      return data
    },
  },
  mounted(){
    this.actionFetchTodays()
  }
}
</script>