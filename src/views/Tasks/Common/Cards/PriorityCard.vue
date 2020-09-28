<template>
  <div>
    <!-- max-width="500" -->
      <!-- :style="`border-left: 7px solid ${sideCardColor}`" -->
    <v-card
    shaped
      outlined
      :dark="darkMode"
      :color="cardColor"
      z-index="1"
    >

        <!-- :color="sideCardColor" -->
      <v-system-bar
      >
        <v-spacer></v-spacer>

        <v-icon>mdi-window-minimize</v-icon>

        <v-icon>mdi-window-maximize</v-icon>
                  <TaskDialog :task="task" />

        <v-icon>mdi-close</v-icon>
      </v-system-bar>

      <!-- color="grey lighten-4" -->
      <v-list subheader>
        <v-list-item
        >
          <v-list-item-content>

            <!-- <v-list-item-title 
              v-text="task.title"
            >
            </v-list-item-title> -->

            <v-list-item-subtitle>
              {{ task.desc }}

              <!-- <v-row dense color="grey"> -->
              <!-- <v-system-bar 
                color="grey lighten-4"
                window
              >
                <v-icon size="large">mdi-account</v-icon>

                <v-icon size="large">mdi-pencil</v-icon>

                <v-spacer></v-spacer>

                <TaskDialog :task="task" />
                <v-icon 
                  size="large"
                  :color="topsIconColor()"
                  @click="topsToggle()"
                >
                  mdi-alert-circle-outline
                </v-icon>

                <v-icon 
                  :color="favIconColor()"
                  @click="favoritesToggle()"
                >
                  {{ icon }}
                </v-icon>

              </v-system-bar> -->
              <!-- </v-row> -->

            </v-list-item-subtitle>
            <v-list-item-title 
              v-text="task.title"
            >
            </v-list-item-title>

          </v-list-item-content>

          <!-- <v-list-item-icon class="d-flex justify-center ">

            <TaskDialog :task="task" />

            <v-icon 
              size="large"
              :color="topsIconColor()"
              @click="topsToggle()"
            >
              mdi-alert-circle-outline
            </v-icon>

            <v-icon 
              :color="favIconColor()"
              @click="favoritesToggle()"
            >
              {{ icon }}
            </v-icon>
          </v-list-item-icon> -->

        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import TaskDialog from "@/views/Tasks/TaskDialog"

export default {
  components: {
    TaskDialog
  },
  props: {
    task: Object,
    icon: String,
    project: {
      type: Object,
      required: false
    },
    cardColor: {
      type: String,
      required: false,
      default: '#CFD8DC'
    },
    darkMode: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    sideCardColor(){
      let css_color = ''
      switch(this.task.status){
        case 'unstarted':
          css_color = "grey"
          break
        case 'started':
          css_color = "#42A5F5"
          break
        case 'closed':
          css_color = "#81C784"
          break
      }
      return css_color
    },
  },
  methods: {
    ...mapActions('projects', ['updateTaskColumn']),
    ...mapActions('tasks', ['actionUpdateTaskColumn']),
    favoritesToggle(){
      const payload = { action: 'favorite', value: '' }
      const favStatus = !this.task.favorite
      this.actionUpdateTaskColumn({ key: this.task.id, value: { name: payload.action, value: favStatus }})
    },
    topsToggle(){
      const payload = { action: 'today', value: '' }
      const today = !this.task.today
      this.actionUpdateTaskColumn({ key: this.task.id, value: { name: payload.action, value: today }})
    },
    favIconColor(){
      return this.task.favorite == true ? 'blue' : ''
    },
    topsIconColor(){
      return this.task.today == true ? 'blue' : 'black'
    }
  },
}
</script>