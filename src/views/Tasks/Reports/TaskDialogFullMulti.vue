<template>
  <v-container>
  <!-- <v-row justify="center"> -->
  <v-row>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

      <template v-slot:activator="{ on }">
                      <!-- <Badge :label="project.name" :number="project.favorites.length" /> -->
        <v-btn 
          text 
          v-on="on"
          outlined
        >
          <v-badge
            content="0"
          >
            {{ label }}
          </v-badge>
          <!-- {{ label }} -->
        </v-btn>
      </template>

      <v-card class="border">
        <v-toolbar 
          dark 
        >
          <v-toolbar-title
            class="border"
          >
            Project - {{ project.name }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-col class="d-flex mt-2 select" cols="12" md="3" sm="6">
            <v-select
              v-model="selectedBoards"
              :items="boards"
              solo
              light
              attach
              chips
              label="Boards"
              multiple
              @change="switchBoard()"
              class="mt-5"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 1">
                  <span>{{ item }}</span>
                </v-chip>
                <span
                  v-if="index === 3"
                  class="grey--text caption"
                >(+{{ boards.length - 1 }} others)</span>
              </template>
            </v-select>
          </v-col>

          <v-col class="d-flex " cols="12" md="1" sm="6">
          <v-spacer></v-spacer>
            <v-btn 
              icon 
              dark 
              @click="dialog = false"
            >
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
              <Badge label="Priority" :number="favoriteTasksLength(arrayId)" />
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
import constants from "@/util/mixins/constants"
import PriorityCard from "@/views/Tasks/Common/PriorityCard"

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
    PriorityCard
  },
  mixins: [constants],
  props: {
    arrayId: Number,
    incomingProject: Object,
    label: String,
    allProjectsData: Array
  },
  data(){
      // boards: ['this', 'that', 'thenfdfdfd', 'gfdgfg fdgfd gfdgfd'],
      // boards: [{ text: 'this', value: 'one'}, {text: 'that', value: 'two'}],
    return{
      defaultBoard: this.incomingProject.name,
      selectedBoards: [],
      dialog: false,
      project: this.incomingProject
    }
  },
  computed: {
    ...mapState({
      showLoader: state => state.tasks.showLoader
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
      console.log(this.selectedBoards, '--> switchBoard CLICK')
      // this.allProjectsData[this.selectedBoards.]
      this.selectedBoards.map((b) => { console.log( this.allProjectsData[b].tasks, '= allProjectsData[b]') })
      var x = this.selectedBoards.filter((b) => { this.allProjectsData[b].tasks })
      console.log(x, '= xxxxxx')
      return x
    }
  },
}
</script>

<style lang="scss" scoped>
.select{
  z-index: -1;
}
</style>