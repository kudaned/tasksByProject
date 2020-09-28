<template>
  <div class="d-flex justify-center" :class="customCss">
    {{ wording }}
  </div>
</template>

<script>
export default {
  props: {
    wording: String,
    customCss: {
      required: false,
      type: String
    }
  },
}
</script>