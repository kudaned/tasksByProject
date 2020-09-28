<template>
  <!-- TOPS -->
  <v-row class=" ">
    <div class="mx-5">

      <v-row>
        <v-col v-for="(comment, comment_idx) in commentPriorities" :key="`grade_${comment_idx}`" cols="12" md="4" class="">

          <CommentPriorityCard 
            :task="task" 
            icon="mdi-star" 
            cardColor="red"
          />

        </v-col>
      </v-row>
    </div>
  </v-row>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import Badge from "@/components/Badge"
import CommentPriorityCard from "@/views/Tasks/Dashboard/Priorities/Comments/CommentPriorityCard"

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