<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon
          v-on="on"
          @click="cbCrudActions(id, { action: action, value: status })"
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
    action: String,
    status: String,
    color: String,
    iconName: String,
    tooltip: String,
    cbCrudActions: Function
  }
}
</script>