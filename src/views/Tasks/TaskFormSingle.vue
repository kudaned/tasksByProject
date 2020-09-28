<template>
  <div>
    <v-btn 
      v-show="!displayField"
      class="mx-2" 
      :fab="true"
      :small="iconSmall"  
      :large="iconLarge"  
      :color="color"
      @click="showField"
      dark 
    >
      <v-icon 
      >
        {{ iconName }}
      </v-icon>
    </v-btn>

    <v-text-field
      v-show="displayField"
      v-model="fieldToEdit"
      :label="labelText"
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
    label: String,
    fieldToEdit: String,
    color: String,
    iconName: String,
    iconSmall: Boolean,
    iconLarge: Boolean,
    callback: Function,
    cbUpdateDesc: Function
  },
  data(){
    return{
      title: '',
      desc: '',
      displayField: false,
      labelText: this.label
    }
  },
  methods: {
    handleChange(){
      if(this.fieldToEdit !== ""){
        this.cbUpdateDesc(this.fieldToEdit)
        this[this.fieldToEdit] = ""
      }
    },
    showField(){
      this.displayField = true
    },
    handleBlur(){
      this.displayField = false
    }
  }
}
</script>