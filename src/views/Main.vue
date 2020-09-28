<template>
  <v-col class="mb-5 " cols="12">
    <!-- <h2 class="headline font-weight-bold mb-3">
      To Dos
    </h2> -->

    <!-- <v-row justify="center"> -->
    <v-row>
      <v-col cols="12" class="">
        <router-view />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  data: () => ({})
};
</script>
