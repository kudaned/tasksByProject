<template>
  <div>
    <v-card
      max-width="500"
      class="mx-auto"
      :outlined="outlineMode"
      :dark="darkMode"
      :color="outlineColor()"
      z-index="1"
    >
      <!-- :style="`border-left: 7px solid ${sideCardColor}`" -->
      <!-- color="grey lighten-4" -->

      <v-list subheader>
      <!-- <v-system-bar :color="sideCardColor" > -->
      <v-system-bar >
        <v-spacer></v-spacer>
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
          size="20"
        >
          {{ icon }}
        </v-icon>

        <TaskDialog :task="task" :iconSize="20" class="" />

      </v-system-bar>
        <v-list-item
        >
          <v-list-item-content>

            <v-list-item-title 
              v-text="task.title"
            >
            </v-list-item-title>

            <!-- <v-list-item-subtitle>
              {{ task.desc }}
            </v-list-item-subtitle> -->


          <!-- <v-list-item-icon class="d-flex justify-center "> -->
            <!-- <div class="">
              <v-spacer></v-spacer>

              <TaskDialog :task="task" class="" />

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

            </div> -->
          </v-list-item-content>
          <!-- </v-list-item-icon> -->

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
    },
    outlineMode: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    sideCardColor(){
      let css_color = ''
      switch(this.task.status){
        case 'unstarted':
          css_color = "grey lighten-2"
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
      let color = ''
      color = this.task.today ? 'blue' : 'black'
      return color
    },
    outlineColor(){
      let color = ''
      if(this.task.today)
        color = 'red'
      else if(this.task.favorite)
        color = 'blue'
      else
        color = this.cardColor

      return color
    }
  },
}
</script>