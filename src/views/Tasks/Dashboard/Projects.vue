<template>
  <v-card 
    flat
    outlined
  >
    <v-card-text>

      <v-row>
        <h2>
          <Badge label="Projects" :number="projects.length" />
        </h2>
      </v-row> 

      <v-row class="d-flex justify-center">

        <!-- FORM -->
        <FormNew class="pt-3" />

        <div v-for="(project, i) in projects" :key="`project_${i}`" no-gutters>
          <v-col cols="12" class="">

            <ProjectCard :project="project" :arrayId="i" />

          </v-col>
        </div>
      </v-row>
      <!-- // PROJECTS -->

    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormNew from "@/views/Tasks/Projects/FormNew"
import ProjectCard from "@/views/Tasks/TaskProjectCard"
import Badge from "@/components/Badge"

export default {
  components: {
    Badge,
    FormNew,
    ProjectCard
  },
  computed: {
    ...mapState({
      projects: state => state.projects.projectsData
    })
  },
  methods: {
    ...mapActions('projects', ['fetchAllProjects', 'addNewTask']),
    cbCreateNew(title, projectId){
      this.addNewTask({ title: title, status: 'unstarted', project_id: projectId })
    },
  },
  mounted(){
    this.fetchAllProjects()
  }
}
</script>