<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <!-- BUTTON -->
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
        <!-- class="mr-3" -->
      <v-icon
        v-on="on"
        dense
        icon
        :size="iconSize"
      >
        mdi-window-maximize
      </v-icon>
    </template>
    <!-- // BUTTON -->

    <v-card>
      <!-- TOOLBAR -->
      <v-toolbar 
        color="grey lighten-4"
        flat
      >
        <v-card-title>
          <!-- <span 
            v-if="!editMode"
            @click="editMode = true"
            @blur="handleTitleBlur()"
            class="headline">{{ task.title }}
          </span>
          <v-text-field
            v-else
          ></v-text-field> -->
            <!-- :contenteditable="boolTitleEdit" -->
            <!-- @blur="endTitleEdit($event)" -->
            <!-- @input="event => endTitleEdit($event)" -->
            <span
            :v-text="newTitle"
            contenteditable
            @blur="endTitleEdit($event)"
            @keydown.enter="endTitleEdit($event)" 
            class="editTitle"
            >{{ task.title }}</span>
            <!-- <span class="headline">{{ task.title }}</span> -->
        </v-card-title>

        <v-spacer></v-spacer>

        <v-btn 
          small
          icon 
          @click="makeEditable()"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn 
          small
          icon 
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- // TOOLBAR -->

      <v-container >
        <v-row >
          <v-col class="" cols="12" md="9" sm="9">

            <v-row no-gutters>
              <v-col class="d-flex justify-center " cols="12" md="2" sm="2">
                <Avatar :iconSize="62" />
                <br>
              </v-col>

              <v-col class="" cols="12" md="10" sm="10">
                <v-textarea
                  v-model="desc"
                  filled
                  name="desc"
                  hide-details
                  outlined
                  label="Enter description"
                  color="blue"
                  @click="showEnterBtn()"
                  @blur="handleBlur($event)"
                  class="mb-1"
                ></v-textarea>
              <!-- {{ task.id }} -->

              </v-col>

            </v-row>
            <!-- </v-card-subtitle> -->

            <v-row class="" no-gutters>
              <v-col cols="12" md="2" sm="2" class="">
              </v-col>

              <v-col cols="12" md="8" sm="6">
                <div>
                  <!-- <v-spacer></v-spacer> -->
                  <v-btn
                    small
                    outlined
                    color="blue"
                    v-show="enterBtnDisplay"
                    @click="updateDesc()"
                  >
                    Update
                  </v-btn>
                </div>
              </v-col>

              <v-col cols="12" md="2" sm="6">
              </v-col>
            </v-row>

            <!-- COMMENTS SECTION -->
            <v-row no-gutters>
              <v-col cols="12" md="12" sm="12">

                <CommentsCard :task="task" />

              </v-col>
            </v-row>
            <!-- // COMMENTS SECTION -->

          </v-col>




          <!-- RIGHT COLUMN -->

          <v-col cols="12" md="3" sm="3" class="mt-1">
              <!-- v-model="newStatus" -->
            <v-select
              :items="taskStatuses"
              label="Change Status"
              dense
              outlined
              v-model="newStatus"
              @change="updateStatus()"
            ></v-select>

            <v-btn
              dark
              block
              small
              outlined
              :color="attrs['today']['colors'][todayed]"
              @click="toggleTodayList()"
            >
              {{ attrs['today']['text'][todayed] }}
            </v-btn>

            <p>&nbsp;</p>

            <v-btn
              block
              small
              outlined
              :color="attrs['favorite']['colors'][favorite]"
              @click="togglePrioritize()"
            >
              {{ attrs['favorite']['text'][favorite] }}
            </v-btn>

            <p>&nbsp;</p>

            <v-spacer></v-spacer>

            <v-btn
              dark
              block
              small
              outlined
              color="red"
              @click="deleteCard()"
            >
              Delete Card
            </v-btn>

          </v-col>
          <!-- // RIGHT COLUMN -->

        </v-row>
        <v-row >
          <v-col class="" cols="12" md="12" sm="12">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>

      </v-container>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import CommentsForm from "@/views/Tasks/Comments/AddForm"
import CommentsCard from "@/views/Tasks/Comments/CommentsCard"
import Avatar from "@/views/Tasks/Avatar"

const attrs = {
  favorite: {
    text: { true: 'De-Prioritize', false: 'Prioritize' },
    colors: { true: 'red', false: 'blue' }
  },
  today: {
    text: { true: 'De-Tops', false: 'Top Priority' },
    colors: { true: 'red', false: 'blue' }
  }
}
const statuses = [
  { text: 'Up Next', value: 'unstarted'},
  { text: 'Start', value: 'started'},
  { text: 'Complete', value: 'closed'},
  { text: 'Archive', value: 'archive'},
]

export default {
  components: {
    Avatar,
    CommentsCard
  },
  props: {
    task: Object,
    iconSize: Number
  },
  data(){
    return{
      attrs: attrs,
      dialog: false,
      title: this.task.title,
      desc: this.task.desc,
      descTracker: this.task.desc,
      enterBtnDisplay: false,
      todayed: this.task.today,
      favorite: this.task.favorite,

      taskStatuses: statuses,
      newStatus: this.task.status,
      newTitle:'',
      editMode: false, // Title Edit Mode

    }
  },
  computed: {
    // TODO NOT IN USE??
    ...mapState({
      showLoader: state => state.comments.showLoader
    }),
  },
  methods: {
    ...mapActions('projects', ['updateTaskColumn', 'deleteTaskAction']),
    ...mapActions('comments', ['actionFetchAllComments', 'actionAddNewComment']),
    ...mapActions('tasks', ['actionTodayAdd','actionTodayRemove', 'actionFetchTodays']),
    showEnterBtn(){
      this.enterBtnDisplay = true
    },
    handleBlur(){
      if(this.descTracker != this.desc) this.updateDesc()
      this.enterBtnDisplay = false
    },
    updateDesc(){
      console.log(this.descTracker, '-=--- descTracker in update Desc')
      this.updateTaskColumn({ key: this.task.id, value: { name: 'desc', value: this.desc }})
      this.descTracker = this.desc.valueOf()
      this.actionFetchTodays()
    },
    toggleTodayList(){
      this.todayed = !this.todayed
      this.updateTaskColumn({ key: this.task.id, value: { name: 'today', value: this.todayed }})
    },
    deleteCard(){
      this.deleteTaskAction({ key: this.task.id })
    },
    togglePrioritize(){
      this.favorite = !this.favorite
      this.updateTaskColumn({ key: this.task.id, value: { name: 'favorite', value: this.favorite }})
    },
    updateStatus(){
      this.updateTaskColumn({ key: this.task.id, value: { name: 'status', value: this.newStatus }})
    },
    onTitleEdit(evt){
      var src = evt.target.innerText
      this.txt = src
    },
    makeEditable(){
      console.log('-= makeEditable')
      // return true
      this.boolTitleEdit = true
    },
    endTitleEdit(e){
      this.updateTaskColumn({ key: this.task.id, value: { name: 'title', value: e.target.innerText }})
      // this.actionFetchTodays()
    },
    handleTitleBlur(){
      console.log(this.editMode, '-= handleTitleBlur')
      // this.editMode = false
    }
  }
}
</script>