<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          @click="cbProjectId(id)"
          :color="color"
        >
          <!-- <span v-if="isBlank(iconName)"> -->
          <!-- </span> -->
          {{ btnText }}
          <v-icon right dark v-if="iconVisible">
            {{ iconName }}
          </v-icon>

        </v-btn>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    btnText: String,
    progress: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'grey'
    },
    iconName: String,
    iconVisible: {
      type: Boolean,
      default: false
    },
    tooltip: String,
    cbProjectId: Function
  }
}
</script>