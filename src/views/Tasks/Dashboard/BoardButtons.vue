<template>
  <v-card 
    outlined
    color="grey lighten-4"
  >
    <v-card-text>
      <!-- PRIORITY DROPDOWN -->
      <div class="mb-3">

        <h2>
          Projects
        </h2>

      </div>

      <v-row>
        <v-col v-for="(project, project_idx) in projects" :key="`project_${project_idx}`" cols="12" md="3" class="">

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

        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="">
          <Loader :show-loader="showLoader" />
        </v-col>
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TaskDialogFull from "@/views/Tasks/TaskDialogFull"
import Loader from "@/components/Loader"

export default {
  components: {
    Loader,
    TaskDialogFull
  },
  computed: {
    ...mapState({
      projects: state => state.projects.projectsData,
      showLoader: state => state.projects.showLoader
    }),
    // ...mapGetters('projects', [
    //   'favoriteTasks',
    //   'startedTasks',
    //   'unstartedTasks',
    //   'completedTasks',
    //   'unstartedTasksOnly10'
    // ]),
  },
  methods: {
    ...mapActions('projects', ['fetchAllProjects', 'addNewTask']),
  },
  mounted(){
    this.fetchAllProjects()
  }
}
</script>