<template>
  <div>
    <v-text-field
      v-model="content"
      label="Enter Comment and press enter"
      ref="titleField"
      filled
      hide-details
      raised
      rounded
      class="mt-3"
      @change="handleChange"
      :error-messages="errMsg"
    ></v-text-field>
  </div>
</template>

<script>
import validators from "@/util/mixins/validators"
export default {
  props: {
    task: Object,
    addNewComment: Function
  },
  data(){
    return{
      content: '',
      errMsg: ''
    }
  },
  mixins: [validators],
  methods: {
    handleChange(){
      if(!this.isBlank(this.content)){
        this.addNewComment(this.content, this.task.id)
        this.content = ''
      }else
        this.errMsg = ['Comment missing!']
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