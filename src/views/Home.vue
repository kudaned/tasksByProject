<template>
  <div>
    <!-- <h1 class="display-2 font-weight-bold mb-3">MAIN</h1> -->


    <v-row>
      <h2>
        Projects
      </h2>

      <v-col cols="12" class="">
        <Btn 
          :id="1"
          :progress="`${completedTasks.length}/${tasks.length}`"
          color=""
          iconName=""
          tooltip="Open Project"
          :cbProjectId="cbProjectId" 
          class="ml-3"
        />
      </v-col>

      <v-col cols="12" class="">
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          x-large
          outlined
        >
          <!-- <v-icon right dark>mdi-cloud-upload</v-icon> -->
           Home ({{`${completedTasks.length}/${tasks.length}`}})
        </v-btn>
      </v-col>

      <v-col cols="12" class="">
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          x-large
          outlined
        >
          <!-- <v-icon right dark>mdi-cloud-upload</v-icon> -->
           Elkwood ({{`${completedTasks.length}/${tasks.length}`}})
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="">
        <Loader :show-loader="showLoader" />
        <!-- {{tasks}}
        Test -->
      </v-col>
    </v-row>

    <!-- <v-row align="center" justify="center">
      <TaskForm :callback="newTaskSubmit" />
    </v-row> -->

    <v-row class="">
      <v-col cols="4" md="4" sm="6" xs="12" class="">
        <h2>
          Up Next({{unstartedTasks.length}})
        </h2>

      <v-row align="center" justify="center">
        <v-col cols="12" sm="11" md="11">
          <!-- <TaskForm 
            :label="'Enter Task Title and tab...'"
            :callback="newTaskSubmit" 
          /> -->
          <TaskFormTitle 
            :label="'Enter title and enter...'"
            :cbCreateNew="cbCreateNew" 
          />
        </v-col>
      </v-row>

        <div v-for="(task, i) in unstartedTasks" :key="`unstarteds_${i}`" no-gutters>
          <Task 
            :task="task" 
            :callback="cbUpdateTaskStatus" 
            :deleteTask="deleteTask" 
            :toggleTaskDialog="toggleTaskDialog"
            :cbUpdateDesc="cbUpdateDesc" 
          />
        </div>
      </v-col>

      <v-col cols="4" md="4" sm="6" xs="12" class="">
        <h2>
          In Progress({{startedTasks.length}})
        </h2>
        <div v-for="(task, i) in startedTasks" :key="`starteds_${i}`" no-gutters>
          <Task 
            :task="task" 
            :callback="cbUpdateTaskStatus" 
            :deleteTask="deleteTask" 
          />
        </div>
      </v-col>

      <v-col cols="4" md="4" sm="12" xs="12" class="">
        <h2>
          Completed({{completedTasks.length}})
        </h2>
        <div v-for="(task, i) in completedTasks" :key="`completeds_${i}`" no-gutters>
          <Task 
            :task="task" 
            :callback="cbUpdateTaskStatus" 
            :deleteTask="deleteTask" 
          />
        </div>
      </v-col>
    </v-row>

    <TaskDialog
      :v-model="openDialogModel"
    />
    <v-dialog v-model="openDialogModel" width="600px">
      <v-card>

        <v-card-title>
          <span class="headline">
            IS DTK IN DENIAL ABOUT BEING A REPUBLICAN?
          </span>
        </v-card-title>

        <v-card-text>
          This is it
          <br/>
          This is it
          <br/>
          This is it
        </v-card-text>

      </v-card>
    </v-dialog>

  </div>
</template>

<script>
// import Task from "@/views/Tasks/Task"
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Task from "@/views/Tasks/TaskCardSmall"
import TaskFormTitle from "@/views/Tasks/TaskFormTitle"
import Loader from "@/components/Loader"
import TaskDialog from "@/views/Tasks/TaskDialog"

const UNSTARTED = "unstarted"
const STARTED = "started"
const CLOSED = "closed"
const ARCHIVE = "archived"

export default {
  components: {
    Task,
    Loader,
    TaskFormTitle,
    TaskDialog
  },
  data() {
    return {
      // outgoingValue: false,
      openDialogModel: false
    };
  },
  computed: {
    ...mapState({
      tasks: state => state.tasks.tasksData,
      showLoader: state => state.tasks.showLoader
    }),
    ...mapGetters('tasks', [
      'unstartedTasks',
      'startedTasks',
      'completedTasks'
    ]),
  },
  methods: {
    ...mapActions('tasks', ['updateTaskStatus', 'updateDesc', 'addNew', 'deleteTaskAction']),
    ...mapMutations('tasks', ['updateStatus']),

    cbProjectId(id){
      console.log(id, 'cbProjectId')
    },


    cbCreateNew(title){
      this.addNew({ title: title, status: UNSTARTED, project_id: 1 })
    },
    cbUpdateDesc(id, desc){
      this.updateDesc({ key: id, value: desc })
    },
    cbUpdateTaskStatus(id, status){
      const newLabel = status === 'requeue' ? UNSTARTED : this.transitionStatus(status)
      const currentTask = this.tasks.filter((t) => t.id == id )[0]

      this.updateStatus({ key: id, value: newLabel })
      this.updateTaskStatus({ key: id, value: currentTask })
    },
    deleteTask(id){
      this.deleteTaskAction({ key: id })
    },
    toggleTaskDialog(id, toggle){
      console.log(id, '--> toggleDiague')
      console.log(toggle, '--> Toggle')
      this.openDialogModel = true
    },
    transitionStatus(st) {
      let status = st
      if (status === UNSTARTED) {
        status = STARTED
      } else if (status === STARTED) {
        status = CLOSED
      } else if (status === CLOSED) {
        status = STARTED
      } else if (status === ARCHIVE) {
        status = ARCHIVE
      }
      return status;
    }
  },
  mounted() {
    this.$store.dispatch("tasks/fetch", {});

    console.log(this.$store.state.tasks.tasksData, "= MOUNTED");
  }
};
</script>

