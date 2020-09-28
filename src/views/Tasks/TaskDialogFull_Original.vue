<template>
  <v-container>
  <!-- <v-row justify="center"> -->
  <v-row>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

      <template v-slot:activator="{ on }">
        <v-btn 
          text 
          v-on="on"
          outlined
        >
            <!-- :content="tasksCount()" -->
          <v-badge
            v-if="showBadge"
            :content="tasksCount()"
          >
            {{ label }}
          </v-badge>
          <span v-else>
            {{ label }}
          </span>
        </v-btn>
      </template>

      <v-card class="border">
        <v-toolbar 
          dark 
        >
          <v-toolbar-title
          >
            Project - {{ projectName }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- Board Data Switcher -->
          <v-col class="d-flex mt-2 select" cols="12" md="3" sm="6">
            <v-select
              v-model="selectedBoard"
              :items="boards"
              solo
              light
              attach
              label="Boards"
              @change="switchBoard()"
              class="mt-5"
            >
            </v-select>
          </v-col>
          <!-- // Board Data Switcher -->

          <v-col class="d-flex " cols="12" md="1" sm="6">

            <v-spacer></v-spacer>

            <v-btn 
              icon 
              dark 
              @click="closeDialog()"
            >
              <!-- @click="dialog = false" -->
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-toolbar>

        <v-row>
          <v-col cols="12" class="">
            <Loader :show-loader="showLoader" />
          </v-col>
        </v-row>

        <v-row class="">
          <v-col cols="12" md="3" sm="6" xs="12" class="">
            <h2>
              Chart
            </h2>
            <div>
              <ProgressChart 
                :favorites="favoriteTasksLength(arrayId)"
                :unstarted="unstartedTasksLength(arrayId)"
                :started="startedTasksLength(arrayId)"
                :completed="completedTasksLength(arrayId)"
                :arrayId="arrayId"
              />
            </div>

            <p>&nbsp;</p>

            <h2>
              <Badge label="Priorities" :number="favoriteTasksLength(arrayId)" />
            </h2>

            <div v-for="(task, i) in favoriteTasks(arrayId)" :key="`unstarteds_${i}`" no-gutters>

              <PriorityCard :task="task" icon="mdi-star" :cbFavorite="favorite" />

            </div>

          </v-col>

          <v-col cols="12" md="3" sm="6" xs="12" class="">
            <h2>
              <Badge label="Up Next" :number="unstartedTasksLength(arrayId)" />
            </h2>

          <v-row align="center" justify="center">
            <v-col cols="12" sm="11" md="11">

              <TaskFormTitle 
                :label="'Enter title then press enter...'"
                :cbCreateNew="cbCreateNew" 
              />

            </v-col>
          </v-row>

            <div v-for="(task, i) in unstartedTasks(arrayId)" :key="`unstarteds_${i}`" no-gutters>

              <Task 
                :task="task" 
                :cbCrudActions="cbCrudActions" 
              />

            </div>
          </v-col>

          <v-col cols="12" md="3" sm="6" xs="12" class="">
            <h2>
              <Badge label="In Progress" :number="startedTasksLength(arrayId)" />
            </h2>
            <div v-for="(task, i) in startedTasks(arrayId)" :key="`starteds_${i}`" no-gutters>

              <Task 
                :task="task" 
                :cbCrudActions="cbCrudActions" 
              />

            </div>
          </v-col>

          <v-col cols="12" md="3" sm="6" xs="12" class="">
            <h2>
              <Badge label="Completed" :number="completedTasksLength(arrayId)" />
            </h2>
            <div v-for="(task, i) in completedTasks(arrayId)" :key="`completeds_${i}`" no-gutters>
              
              <Task 
                :task="task" 
                :cbCrudActions="cbCrudActions" 
              />

              CONSTANTS: {{colors}}
              <!-- COLORS: {{Constants.COLORS}} -->

            </div>
          </v-col>
        </v-row>

      </v-card>

    </v-dialog>
  </v-row>
  </v-container>
</template>

<script>
import { 
  mapState, 
  mapGetters, 
  mapMutations, 
  mapActions
} from "vuex";
import Loader from "@/components/Loader"
import Task from "@/views/Tasks/TaskCardSmall"
import TaskFormTitle from "@/views/Tasks/TaskFormTitle"
import Badge from "@/components/Badge"
import Constants from "@/util/mixins/constants"
import PriorityCard from "@/views/Tasks/Common/PriorityCard"
import ProgressChart from "@/views/Tasks/FullModal/ProgressChart"

const UNSTARTED = "unstarted"
const STARTED = "started"
const CLOSED = "closed"
const ARCHIVE = "archived"

export default {
  components: {
    Task,
    Badge,
    Loader,
    TaskFormTitle,
    PriorityCard,
    ProgressChart
  },
  props: {
    boardArrayId: Number,
    incomingProject: Object,
    incomingLabel: String,
    showBadge: {
      default: false,
      required: false
    },
    colors: Constants
  },
  // mixins: [Constants],
  mounted(){
    // TODO Fix
    // console.log(Constants.COLORS)
  },
  data(){
      // boards: ['this', 'that', 'thenfdfdfd', 'gfdgfg fdgfd gfdgfd'],
      // boards: [{ text: 'this', value: 'one'}, {text: 'that', value: 'two'}],
    return{
      arrayId: this.boardArrayId,
      defaultBoard: this.incomingProject.name,
      label: this.incomingLabel,
      selectedBoard: (this.boardArrayId + 1),
      dialog: false,
      project: this.incomingProject,
      projectName: this.incomingLabel
    }
  },
  computed: {
    ...mapState({
      showLoader: state => state.tasks.showLoader,
      allProjectsData: state => state.projects.projectsData
    }),
    ...mapGetters('projects', [
      'unstartedTasks',
      'startedTasks',
      'completedTasks',
      'archivedTasks',
      'favoriteTasks',
      'unstartedTasksLength',
      'startedTasksLength',
      'completedTasksLength',
      'archivedTasksLength',
      'favoriteTasksLength',
    ]),
    boards(){
      var data = []
      this.allProjectsData.forEach((p) => {
        data.push( {text: p.name, value: p.id } )
      })
      return data
    }
  },
  methods: {
    ...mapActions('projects', ['addNewTask', 'updateTaskColumn', 'deleteTaskAction']),
    ...mapMutations('projects', ['mutateColumn']),
    // ...mapActions('tasks', ['actionFetchTodays']),
     // ...mapMutations('projects', ['mutateColumn', 'updateStatus', 'concatToProjectTasks']),
    cbCreateNew(title){
      this.addNewTask({ title: title, status: UNSTARTED, project_id: this.project.id })
    },
    cbCrudActions(id, payload){
      if(payload.action === 'delete')
        this.delete(id)
      else
        this[payload.action](id, { action: payload.action, value: payload.value })
    },
    status(id, payload){
      const newLabel = payload.value === 'requeue' ? UNSTARTED : this.transitionStatus(payload.value)
      this.updateTaskColumn({ key: id, value: { name: payload.action, value: newLabel }})
    },
    desc(id, payload){
      this.updateTaskColumn({ key: id, value: { name: payload.action, value: payload.value }})
    },
    // TODO Bug Fix!!
    favorite(id, payload){
      console.log('ID: ' + id + 'Val: ' + payload.value)
      console.log(this.project.tasks.filter((t) => t.id == id)[0].favorite, '=- FAVORITE - NOT negated')
      const favStatus = !this.project.tasks.filter((t) => t.id == id)[0].favorite // ? false : true
      console.log(favStatus, 'FAVORITE - Negated')
      this.updateTaskColumn({ key: id, value: { name: payload.action, value: favStatus }})
      this.mutateColumn({ key: this.arrayId, value: { id: id, column: 'favorite', value: favStatus }})
    },
    delete(id){
      this.deleteTaskAction({ key: id })
    },
    transitionStatus(st){
      let status = st
      if (status === UNSTARTED){
        status = STARTED
      } else if (status === STARTED){
        status = CLOSED
      } else if (status === CLOSED){
        status = STARTED
      } else if (status === ARCHIVE){
        status = ARCHIVE
      }
      return status;
    },
    switchBoard(){
      // this.$store.commit('tasks/set', { key: 'showLoader', value: true })
      this.arrayId = (this.selectedBoard - 1) // Because we dealing with an array
      this.projectName = this.allProjectsData[this.arrayId].name
      // setTimeout(() => {
      //   this.$store.commit('tasks/set', { key: 'showLoader', value: false })
      // , 500 })
    },
    tasksCount(){
      return this.allProjectsData[this.arrayId].tasks.length
    },
    closeDialog(){
      // this.actionFetchTodays()
      this.dialog = false
    }
  },
}
</script>

<style lang="scss" scoped>
// .select{
//   z-index: 9999;
// }
</style>