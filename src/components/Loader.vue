<template>
  <div>
    <div
      v-show="showLoader"
      class="overlay flex flex-column items-center justify-center"
      >
      <spinner
        :size="loaderSize"
        :message="loaderMessage"
        />
    </div>

      <div v-show="showNoDataMsg">
        <span class="no-data-msg mt-5">
          {{ noDataMsg }}
        </span>
      </div>
  </div>
</template>

<script>

import Spinner from 'vue-simple-spinner'

export default {
  components: {
    Spinner
  },
  props: {
    showLoader: {
      required: true,
      type: Boolean,
      default: false
    },
    showNoDataMsg: {
      required: false,
      type: Boolean,
      default: false
    },
    noDataMsg: {
      required: false,
      type: String,
      default: 'No Data Found'
    },
    loaderSize: {
      required: false,
      type: String,
      default: 'medium'
    },
    loaderMessage: {
      required: false,
      type: String,
      default: 'Loading...'
    }
  }
}
</script>

<style lang="css" scoped>
.no-data-msg{
  display: flex;
  flex: 1;
  justify-content: center;
}
</style>
