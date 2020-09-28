<template>
  <div>
    <v-text-field
      v-model="title"
      :label="label"
      ref="titleField"
      filled
      hide-details
      raised
      rounded
      class="mt-3"
      @change="handleChange"
      @blur="cbHandleBlur"
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
    cbHandleBlur: Function,
    large: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data(){
    return{
      title: ''
    }
  },
  methods: {
    handleChange(){
      if(this.title !== ''){
        this.cbCreateNew(this.title, this.projectId)
        this.title = ''
      }
    },
    // showField(){
    //   this.displayField = true
    // },
    // handleBlur(){
    //   this.displayField = false
    // }
  },
  updated() {
    this.$refs.titleField.focus()
  },
}
</script>