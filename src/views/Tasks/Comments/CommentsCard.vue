<template>
  <v-card
    class="mx-auto"
    flat
  >

    <v-list>

      <v-list-item class="">
        <v-row no-gutters>
          <v-col class="" cols="12" md="2" sm="2">

            <v-list-item-action>

              <Avatar 
                :iconSize="50"
                :extraLargeIcon="true" 
              />

            </v-list-item-action>

          </v-col>

          <v-col cols="12" md="10" sm="10" class="">
            <v-list-item-content>

              <CommentsForm 
                :addNewComment="addNewComment" 
                :task="task" 
              />

            </v-list-item-content>
          </v-col>
        </v-row>

      </v-list-item>

      <div v-if="comments.length">
        <Loader :show-loader="showLoader" />
        <div v-for="(comment, index) in comments" :key="index">
          <v-list-item>

            <v-list-item-action>
              <Avatar />
            </v-list-item-action>

            <v-list-item-content>
              <div v-if="!showLoader">

                <!-- DATE -->
                <!-- <small class="d-flex justify-lg-end"> -->
                <small >
                  {{ toLocalDate(comment.updated_at) }}
                </small>
                <v-spacer></v-spacer>
                <!-- COMMENT -->
                <span>
                {{ comment.content }}
                </span>

              </div>
            </v-list-item-content>

            <v-list-item-action>
              <v-row no-gutters="">
                <v-col>
                  <v-icon 
                    size="large"
                    :color="attrs['tops']['colors'][comment.tops]"
                    @click="toggleColumn(comment, 'tops')"
                  >
                    mdi-alert-circle-outline
                  </v-icon>
                </v-col>

                <v-col>
                  <v-icon 
                    size="large"
                    :color="attrs['priority']['colors'][comment.priority]"
                    @click="toggleColumn(comment, 'priority')"
                  >
                    mdi-star
                  </v-icon>
                </v-col>

                <v-col>
                  <v-icon size="large">mdi-pencil</v-icon>
                </v-col>
                <v-col>
                  <v-icon size="large">mdi-close</v-icon>
                </v-col>
              </v-row>
            </v-list-item-action>

          </v-list-item>

          <v-divider inset>xx</v-divider>
        </div>
      </div>

      <div 
        v-else 
        class="d-flex justify-center mt-5"
      >
        No comments
      </div>

    </v-list>

  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Avatar from "@/views/Tasks/Avatar"
import CommentsForm from "@/views/Tasks/Comments/AddForm"
import Loader from "@/components/Loader"

const attrs = {
  tops: {
    colors: { true: 'red', false: 'black' }
  },
  priority: {
    colors: { true: 'red', false: 'black' }
  }
}

export default {
  components: {
    Avatar,
    CommentsForm,
    Loader
  },
  props: {
    task: Object
  },
  data() {
    return {
      attrs: attrs
    }
  },
  computed: {
    ...mapState({
      comments: state => state.comments.commentsData,
      showLoader: state => state.comments.showLoader
    }),
  },
  mounted() {
    this.actionFetchAllComments(this.task.id)
  },
  methods: {
    ...mapActions('comments', ['actionFetchAllComments', 'actionAddNewComment', 'actionCommentUpdateColumn']),
    // TODO Add boardId
    addNewComment(content, taskId){
      this.actionAddNewComment({
        content: content, 
        commentable_id: taskId, 
        commentable_type: "Todo",
        tops: false,
        user_id: 1
      })
    },
    toggleColumn(comment, name){
      this.actionCommentUpdateColumn([
        this.task.id,
        { key: comment.id, value: { [name]: !comment[name] }}
      ])
    },
    // Move to Util/Commons
    toLocalDate(time){
      const date = new Date(time)
      return date.toLocaleDateString("en-US")
    }
  }
}
</script>