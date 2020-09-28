<template>
  <span>
    <v-badge
      :color="color"
      :content="number"
    >
      {{ label }}
    </v-badge>
  </span>
</template>

<script>
export default {
  props: {
    label: String,
    number: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      required: false,
      default: 'blue'
    }
  }
}
</script>