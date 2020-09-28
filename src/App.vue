<template>
  <v-app>

    <v-toolbar
      color="grey lighten-4"
    >
      <!-- <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn> -->

      <v-toolbar-title>Memory Expander</v-toolbar-title>

        <!-- :indeterminate="loading" -->
      <v-progress-linear
        :active="showLoader"
        absolute
        top
        color="red"
      ></v-progress-linear>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>


    <!-- <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

    </v-app-bar> -->

    <!-- <v-content class="border-blue"> -->
    <v-content>
      <v-container>
        <v-row>
          <!-- <v-col cols="1">
            <Side/>
          </v-col> -->

          <!-- <v-col cols="11"> -->
          <v-col cols="12">
            <Main/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex"
// import Side from './views/Menus/Side';
import Main from './views/Main';

export default {
  name: 'App',
  components: {
    // Side,
    Main
  },
  computed: {
    ...mapState({
      showLoader: state => state.projects.showLoader,
    })
  }
}
</script>

<style>
.border{
  border: 1px solid red;
}
.border-blue{
  border: 1px solid blue;
}
</style>
