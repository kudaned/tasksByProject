<template>
  <div>
    <v-btn 
      v-show="!displayField"
      class="mx-2" 
      :fab="true"
      color="grey"
      large
      @click="showField"
      dark 
    >
      <v-icon 
      >
        mdi-plus
      </v-icon>
    </v-btn>

    <v-card
      flat
      v-if="displayField"
    >

      <v-list-item-content>

        <v-text-field
          v-model="name"
          label="Enter Name"
          hide-details="auto"
          :rules="rules"
          ref="nameField"
          filled
          raised
          rounded
          class="mt-3"
        ></v-text-field>

        <v-text-field
          v-model="desc"
          label="Enter description"
          ref="descField"
          filled
          hide-details
          raised
          rounded
          class="mt-3"
        ></v-text-field>

      </v-list-item-content>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          @click="handleSubmit()"
        >
          Submit
        </v-btn>

        <v-btn
          @click="handleBlur()"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>

      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data(){
    return{
      name: '',
      desc: '',
      displayField: false,
      rules: [
        value => !!value || '* Required.'
      ]
    }
  },
  methods: {
    ...mapActions('projects', ['actionNewProject']),
    handleSubmit(){
      if(this.name != ""){
        const fields = { name: this.name, desc: this.desc }
        this.actionNewProject(fields)
        this.name = ''
        this.desc = ''
      }
    },
    showField(){
      this.displayField = true
    },
    handleBlur(){
      this.displayField = false
    },
    // handleBlur2(){
    //   this.displayField = false
    // }
  },
  // updated() {
  //   this.$refs.titleField.focus()
  // },
}
</script>