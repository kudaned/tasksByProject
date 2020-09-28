<template>
  <v-chip
    class="ma-2"
    close
    :color="color"
    text-color="white"
    :close-icon="icon"
    @click:close="callback(id, status)"
  >
    {{displayLabel}}
  </v-chip>
</template>

<script>
export default {
  props: {
    id: String,
    status: String,
    displayLabel: String,
    callback: Function,
    color: String,
    icon: String
  }
}
</script>