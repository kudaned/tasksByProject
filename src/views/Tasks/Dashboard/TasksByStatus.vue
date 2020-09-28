<template>
  <v-card 
    outlined
  >
    <v-card-text>
      <!-- PRIORITY DROPDOWN -->
      <div class="mb-3">

        <h2>
          Tasks By Status
          <!-- <Badge label="Top Priorities" :number="projectData(arrId)" /> -->
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

      <v-row>
        <v-col v-for="(project, project_idx) in projects" :key="`project_${project_idx}`" cols="12" md="4" class="">
          <div class="mb-1">
            <h3>
              <!-- BOARD BUTTONS -->
              <TaskDialogFull 
                :boardArrayId="project_idx"
                :incomingProject="project"
                :incomingLabel="project.name"
                :showBadge="true"
              />
            </h3>
          </div>

          <v-row>
            <v-col>

              <v-btn 
                dark 
                fab
                outlined
                small
                class="mx-2" 
                color="grey"
                @click="showField(`titleField_${project_idx}`)"
              >
                <v-icon 
                >
                  mdi-plus
                </v-icon>
              </v-btn>

              <v-text-field
                v-show="displayFieldStatus(`titleField_${project_idx}`)"
                v-model="title"
                label="Enter title then press enter..."
                :ref="`titleField_${project_idx}`"
                filled
                hide-details
                raised
                rounded
                class="mt-3"
                @change="handleChange(project_idx)"
                @blur="cbHandleBlur"
              ></v-text-field>

              <!-- INPUT FIELD -->
              <!-- <FormTaskTitle 
                v-show="displayField"
                :label="'Enter title then press enter...'"
                :projectId="project.id" 
                :cbCreateNew="cbCreateNew"
                :cbHandleBlur="cbHandleBlur"
                class="mb-5"
              /> -->

            </v-col>
          </v-row>

          <!-- RENDERING BOARD -->
          <div v-for="(task, task_idx) in projectData(project_idx)" :key="`unstarteds_${task_idx}`" class="mb-3" >

            <PriorityCard :project="project" :task="task" icon="mdi-star" />

          </div>

        </v-col>
      </v-row>
      <!-- // PRIORITY -->

    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import PriorityCard from "@/views/Tasks/Common/Cards/PriorityCardCompact"
import TaskDialogFull from "@/views/Tasks/TaskDialogFull"

const FAVORITES = 'favorites'
const STARTED = 'started'
const COMPLETED = 'completed'
const UPCOMING = 'unstarted'

export default {
  components: {
    PriorityCard,
    TaskDialogFull,
  },
  data(){
    return{
      title: '',
      feature: FAVORITES,
      features: [
        { text: 'Priorities', value: FAVORITES },
        { text: 'In Progress', value: STARTED },
        { text: 'Completed', value: COMPLETED },
        { text: 'Upcoming', value: UPCOMING }
      ],
      things: {}
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projects.projectsData,
    }),
    ...mapGetters('projects', [
      'favoriteTasks',
      'startedTasks',
      'unstartedTasks',
      'completedTasks',
      'unstartedTasksOnly10'
    ]),
  },
  methods: {
    ...mapActions('projects', ['fetchAllProjects', 'addNewTask']),
    projectData(arrId){
      let data = []
      if(this.feature === FAVORITES)
        data = this.favoriteTasks(arrId)
      else if(this.feature === STARTED)
        data = this.startedTasks(arrId)
      else if(this.feature === COMPLETED)
        data = this.completedTasks(arrId)
      else if(this.feature === UPCOMING)
        data = this.unstartedTasks(arrId)

      return data
    },
    handleChange(projectId){
      if(this.title !== ''){
        this.addNewTask({ 
          title: this.title, 
          status: 'unstarted', 
          project_id: projectId 
        })
        this.title = ''
      }
    },
    showField(inputName){
      // this[inputName] = true
      this[inputName] = true
      this.feature = UPCOMING
      this.$nextTick(() => {
        this.$refs[inputName][0].focus()
        // this.$refs.titlefield.focus()
      })
    },
    displayFieldStatus(inputName){
      console.log(inputName, '-= inputName')
      console.log(this.things, '-= inputName')
      // return this.things[inputName]
      return false
    },
    cbHandleBlur(){
      console.log('-= handle blur')
      this.displayField = false
    },
    initProjects(){
      return Object.keys(this.projects).forEach((key) => {
        console.log(key, '-= KEY')
        return key = true
      })
    },
  // updated() {
  //   this.$refs.titlefield.focus()
  // },
    limit(array){
      const items = []
      for (const value of array) {
        // if (value.includes(term))
          items.push(value)
        if (items.length === 10)
          break;
      }
    }
  },
  mounted(){
    // this.actionFetchTodays()
    this.fetchAllProjects()
    this.things = this.projects.forEach((p) => {
      console.log(p, '-= PPPP')
    })
  }
}
</script>