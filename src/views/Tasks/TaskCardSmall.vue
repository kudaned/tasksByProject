<template>
  <div>
    <v-col cols="12" class="">

      <v-card
        class="mx-auto"
        shaped
        flat
        dark
      >
          <!-- color="grey  lighten-4" -->
        <v-system-bar
          color="grey lighten-3"
          light
        >
          <!-- START -->
          <TaskIconBtn 
            :id="task.id"
            action="status"
            :status="task.status"
            :color="attrs['colors'][task.status]"
            :iconName="attrs['icons'][task.status]"
            :tooltip="attrs['tooltips'][task.status]"
            :cbCrudActions="cbCrudActions" 
            class="ml-3"
          />
          <!-- REQUEUE -->
          <TaskIconBtn v-if="task.status === 'started'"
            :id="task.id"
            action="status"
            status="requeue" 
            :color="attrs['colors']['requeue']"
            :iconName="attrs['icons']['requeue']"
            :tooltip="attrs['tooltips']['requeue']"
            :cbCrudActions="cbCrudActions" 
          />
          <!-- ARCHIVE -->
          <TaskIconBtn v-if="task.status === 'closed'"
            :id="task.id"
            action="status"
            status="archive" 
            :color="attrs['colors']['archive']"
            :iconName="attrs['icons']['archive']"
            :tooltip="attrs['tooltips']['archive']"
            :cbCrudActions="cbCrudActions" 
          />

          <v-spacer></v-spacer>

          <!-- FAVORITE -->
          <TaskIconBtn
            :id="task.id"
            action="favorite"
            :status="task.status"
            :color="favoritesColor()"
            iconName="mdi-star"
            tooltip="Favorite"
            :cbCrudActions="cbCrudActions" 
          />

          <!-- <v-icon>mdi-star</v-icon> -->
          <TaskDialog :task="task" />

          <TaskIconBtn
            :id="task.id"
            action="delete"
            :status="task.status"
            :color="favoritesColor()"
            iconName="mdi-close"
            tooltip="Delete"
            :cbCrudActions="cbCrudActions" 
          />
        </v-system-bar>

        <!-- <v-card-title>
          {{ task.title }}
        </v-card-title> -->

        <!-- <v-list> -->
        <v-list-item three-line>
          <v-list-item-content>
            
            <!-- <div class="overline mb-4">
              Added
              {{ task.updated_at }}
            </div> -->

            <v-list-item-title class="my-0">
              {{task.title}}
            </v-list-item-title>

            <span v-if="showAddDescBtn()">
              <v-col cols="12" sm="11" md="11">
                <TaskFormDesc 
                  :id="task.id"
                  :label="'Enter description and enter...'"
                  :cbCrudActions="cbCrudActions" 
                />
              </v-col>
            </span>
            <!-- <v-list-item-subtitle v-else> -->
            <v-list-item-subtitle v-if="!showAddDescBtn()">
              {{task.desc}}
            </v-list-item-subtitle>

          </v-list-item-content>

          <!-- <v-list-item-avatar
            tile
            size="80"
            color="grey"
          ></v-list-item-avatar> -->

        </v-list-item>
        <!-- </v-list> -->

      </v-card>
    </v-col>
  </div>
</template>

<script>
const attrs = {
  'colors': { 
    'unstarted': 'blue', 
    'started': 'green', 
    'closed': 'red', 
    'requeue': 'red', 
    'archive': 'grey'
  },
  'icons': { 
    'unstarted': 'mdi-arrow-right-circle-outline', 
    'started': 'mdi-check', 
    'closed': 'mdi-restart', 
    'requeue': 'mdi-restart', 
    'archive': 'mdi-archive-outline'
  },
  'tooltips': { 
    'unstarted': 'Start', 
    'started': 'Complete', 
    'closed': 'Move back to Complete', 
    'requeue': 'Move back to Up Next', 
    'archive': 'Archive'
  }
}

import validators from "@/util/mixins/validators"
import TaskIconBtn from "@/views/Tasks/TaskIconBtn"
import TaskFormDesc from "@/views/Tasks/TaskFormDesc"
// This is maximize button
import TaskDialog from "@/views/Tasks/TaskDialog"

export default {
  components: {
    TaskIconBtn,
    TaskFormDesc,
    TaskDialog
  },
  mixins: [validators],
  props: {
    task: Object,
    cbCrudActions: { 
      required: false,
      type: Function
    }
  },
  data(){
    return{
      attrs: attrs,
    }
  },
  methods: {
    favoritesColor(){
      return this.task.favorite ? 'red' : this.attrs['colors']['favorite']
    },
    // Don't show add Desc for completed Cards
    showAddDescBtn(){
      return this.task.status !== 'closed' && this.isBlank(this.task.desc)
    }
  },
}
</script>