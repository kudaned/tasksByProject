<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon
          v-on="on"
          @click="callback(id, status)"
          :color="color"
          dense
          light
          icon
        >
          {{ iconName }}
        </v-icon>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    status: String,
    color: String,
    iconName: String,
    tooltip: String,
    callback: Function
  }
}
</script>