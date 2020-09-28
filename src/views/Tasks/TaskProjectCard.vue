<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="344"
      min-width="200"
      min-height="150"
    >
      <v-img
        v-if="project.image"
        :src="projectPic()"
        height="200px"
      ></v-img>

      <v-card-title>
        <Badge :label="project.name" :number="activeProjects(arrayId)" color="grey" />
        <!-- {{ project.name }} -->
      </v-card-title>

      <v-card-subtitle>
        {{ project.desc }}
      </v-card-subtitle>

      <v-card-actions>
        <!-- <v-btn text>Open Board</v-btn> -->
        <TaskDialogFull 
          :boardArrayId="arrayId"
          :incomingProject="project"
          incomingLabel="Open"
        />

        <!-- <v-btn
          color="purple"
          text
        >
          Another Action
        </v-btn> -->

        <v-spacer></v-spacer>

        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            <v-chip
              class="ma-2"
              color="grey"
              outlined
            >
              Up Next
              ({{ unstartedTasks(arrayId).length }})
            </v-chip>
            <br>
            <v-chip
              class="ma-2"
              color="grey"
              outlined
            >
              In Progress
              ({{ startedTasks(arrayId).length }})
            </v-chip>

            <br>

            <v-chip
              class="ma-2"
              color="grey"
              outlined
            >
              Completed:
              ({{ completedTasks(arrayId).length }})
            </v-chip>

            <br>

            <v-chip
              class="ma-2"
              color="grey"
              outlined
            >
              Archived:
              ({{archivedTasks(arrayId).length}}) 
            </v-chip>

          </v-card-text>
        </div>
      </v-expand-transition>

    </v-card>
    
  </div>
</template>

<script>
import Badge from "@/components/Badge"
import TaskDialogFull from "@/views/Tasks/TaskDialogFull"
  import { mapGetters } from 'vuex'

  export default {
    components: {
      TaskDialogFull,
      Badge
    },
    props: {
      arrayId: Number,
      project: Object,
    },
    data: () => ({
      show: false,
      openDialog: false
    }),
    computed: {
      ...mapGetters('projects', [
        'unstartedTasks',
        'startedTasks',
        'completedTasks',
        'archivedTasks',
        'activeProjects'
      ]),
    },
    methods: {
      handleOpen(){
        this.openDialog = true
      },
      projectPic(){
        return `https://cdn.vuetifyjs.com/images/cards/${this.project.image}.jpg`
      }
    },
  }
</script>