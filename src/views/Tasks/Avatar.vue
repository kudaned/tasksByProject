<template>
  <div>
    <!-- <v-list-item-avatar class="border" color="grey lighten-3"> -->
      <!-- <v-img :src="item.avatar"></v-img> -->
      <!-- <v-icon
        :large="largeIcon"
        :x-large="extraLargeIcon"
      >
        mdi-account-circle
      </v-icon> -->
      <v-avatar 
        color="indigo"
        :size="iconSize"
      >
        <!-- <v-icon dark>
          mdi-account-circle
        </v-icon> -->
        <span class="white--text headline">KN</span>
      </v-avatar>
    <!-- </v-list-item-avatar> -->
  </div>
</template>

<script>
export default {
  props: {
    iconSize: {
      type: Number,
      default: 40
    },
    largeIcon: {
      type: Boolean,
      default: true
    },
    extraLargeIcon: {
      type: Boolean,
      default: false
    },
  }
}
</script>