<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon
          v-on="on"
          @click="callback(id, true)"
        >
          mdi-window-maximize
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
    tooltip: String,
    callback: Function
  }
}
</script>