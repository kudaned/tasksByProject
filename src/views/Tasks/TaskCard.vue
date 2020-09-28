<template>
  <div>
    <v-col cols="12" class="">

      <v-card
        class="mx-auto"
        shaped
        dark
        flat
      >
        <v-system-bar
          color="grey darken-2"
          dark
        >
          <v-spacer></v-spacer>
          <!-- <v-icon>mdi-window-minimize</v-icon> -->
          <!-- <v-icon>mdi-window-maximize</v-icon> -->
          <MaximizeBtn 
            :id="task.id"
            tooltip="Maximize"
            :callback="toggleTaskDialog"
          />
          <DeleteIcon 
            :id="task.id"
            tooltip="Delete"
            :callback="deleteTask"
          />
        </v-system-bar>

        <!-- <v-card-title>
          {{ task.title }}
        </v-card-title> -->

        <v-list-item three-line>
          <v-list-item-content>
            
            <div class="overline mb-4">
              Added
              {{ task.updated_at }}
            </div>

            <v-list-item-title class="mb-1">
              {{task.title}}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{task.desc}}
            </v-list-item-subtitle>

          </v-list-item-content>

          <!-- <v-list-item-avatar
            tile
            size="80"
            color="grey"
          ></v-list-item-avatar> -->

        </v-list-item>

        <v-card-actions>
          <v-row>
            <v-col cols="12" md="3" sm="6">
              <Btn 
                :id="`${task.id}`" 
                :status="task.status" 
                :callback="callback"
              />
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <Btn v-if="task.status === 'started'"
                :id="`${task.id}`" 
                status="requeue" 
                :callback="callback" 
              />
            </v-col>
          </v-row>
        </v-card-actions>

          <!-- <v-btn text>Button</v-btn> -->
            <!-- <div class="overline mb-4">
              {{ task.updated_at }}
            </div> -->


      </v-card>
    </v-col>
  </div>
</template>

<script>
import DeleteIcon from "@/views/Tasks/DeleteIcon"
import MaximizeBtn from "@/views/Tasks/MaximizeBtn"
import Btn from "@/views/Tasks/TaskButton"

export default {
  components: {
    Btn,
    DeleteIcon,
    MaximizeBtn
  },
  props: {
    task: Object,
    callback: Function,
    deleteTask: Function,
    toggleTaskDialog: Function
  }
}
</script>