<template>
  <div>
    <v-btn 
      v-show="!displayField"
      class="mx-2" 
      color="grey"
      @click="showField"
      dark 
      small
      rounded
      fab
    >
      <v-icon 
      >
        mdi-plus
      </v-icon>
    </v-btn>

    <v-text-field
      v-show="displayField"
      v-model="desc"
      :label="label"
      ref="descField"
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
    id: Number,
    label: String,
    cbCrudActions: Function
  },
  data(){
    return{
      desc: '',
      displayField: false
    }
  },
  methods: {
    handleChange(){
      if(this.desc !== ""){
        this.cbCrudActions(this.id, { action: 'desc', value: this.desc })
        this.desc = ""
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
    this.$refs.descField.focus()
  },
}
</script>