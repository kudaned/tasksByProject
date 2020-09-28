<template>
  <div>
    <v-btn 
      dark 
      fab
      outlined
      :large="large"
      :small="small"
      v-show="!displayField"
      class="mx-2" 
      color="grey"
      @click="showField"
    >
      <v-icon 
      >
        mdi-plus
      </v-icon>
    </v-btn>

    <v-text-field
      v-show="displayField"
      v-model="title"
      :label="label"
      ref="titleField"
      filled
      hide-details
      raised
      rounded
      class="mt-3"
      @change="handleChange"
      @blur="handleBlur"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    projectId: {
      type: Number,
      required: false,
      default: 0
    },
    label: String,
    cbCreateNew: Function,
    large: {
      type: Boolean,
      required: false,
      default: false
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data(){
    return{
      title: '',
      displayField: false
    }
  },
  methods: {
    handleChange(){
      if(this.title !== ''){
        this.cbCreateNew(this.title, this.projectId)
        this.title = ''
      }
    },
    showField(){
      this.displayField = true
    },
    handleBlur(){
      this.displayField = false
    }
  },
  updated() {
    this.$refs.titleField.focus()
  },
}
</script>