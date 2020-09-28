<template>
  <div>
    <v-card
      flat
    >
      <!-- TABS -->
      <!-- <v-toolbar flat color="primary" dark>
        <v-toolbar-title>User Profile</v-toolbar-title>
      </v-toolbar> -->
      <v-tabs vertical>
        <!-- Option 1 -->
        <v-tab>
          <v-icon left>mdi-priority-high</v-icon>
        </v-tab>
        <!-- Option 2 -->
        <v-tab>
          <v-icon left>mdi-ballot-outline</v-icon>
        </v-tab>
        <!-- Option 3 -->
        <v-tab>
          <v-icon left>mdi-access-point</v-icon>
        </v-tab>
        <!-- Option 4 -->
        <v-tab>
          <v-icon left>mdi-access-point</v-icon>
        </v-tab>


        <!-- TASKS TAB -->
        <v-tab-item>

          <!-- PROJECT BUTTONS -->
          <BoardButtons class="mb-2" />

          <!-- TOP PRIORITIES -->
          <TopPriorities />

          <p>&nbsp;</p>

        </v-tab-item>

        <v-tab-item>
          <!-- TASKS BY STATUS -->
          <TasksByStatus />

        </v-tab-item>

        <!-- PROJECTS TAB -->
        <v-tab-item>

          <Projects />

        </v-tab-item>

        <v-tab-item>
          <ProjectStats />

        </v-tab-item>
      </v-tabs>
    </v-card>

    <p class="mb-5"></p>

    <v-row>
      <v-col cols="12" class="">
        <Loader :show-loader="showLoader" />
      </v-col>
    </v-row>

  </div>
</template>

<script>
import { mapState } from "vuex"
import BoardButtons from "@/views/Tasks/Dashboard/BoardButtons"
import TopPriorities from "@/views/Tasks/Dashboard/TopPriorities"
import TasksByStatus from "@/views/Tasks/Dashboard/TasksByStatus"
import Projects from "@/views/Tasks/Dashboard/Projects"
import ProjectStats from "@/views/Tasks/Dashboard/ProjectStats"
import Loader from "@/components/Loader"

export default {
  components: {
    BoardButtons,
    TasksByStatus,
    TopPriorities,
    Projects,
    ProjectStats,
    Loader
  },
  computed: {
    ...mapState({
      showLoader: state => state.projects.showLoader,
    })
  }
}
</script>