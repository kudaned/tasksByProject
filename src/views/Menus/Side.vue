<template>
  <div>

    <div>
      <Slide 
        noOverlay
        :isOpen="isOpen"
        @openMenu="handleOpenMenu"
      >
      <div class="d-flex align-center">
        <v-img 
          alt="Vue logo" 
          src="../../assets/logo.png" 
          class="shrink mr-2"
          width="45" 
        />
        <!-- <v&#45;img -->
        <!--   alt="Vuetify Logo" -->
        <!--   class="shrink mr&#45;2" -->
        <!--   contain -->
        <!--   src="https://cdn.vuetifyjs.com/images/logos/vuetify&#45;logo&#45;dark.png" -->
        <!--   transition="scale&#45;transition" -->
        <!--   width="40" -->
        <!-- /> -->
      </div>
        <router-link to="/" @click.native="closeMenu()">
          Home
        </router-link>
        <router-link to="/login" @click.native="closeMenu()">
          Login
        </router-link>
        <router-link to="/about" @click.native="closeMenu()">
          About
        </router-link>
        <router-link to="/original" @click.native="closeMenu()">
          Original
        </router-link>
        <router-link to="/layout" @click.native="closeMenu()">
          Layout
        </router-link>
      </Slide>
    </div>
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";

export default {
  components: {
    Slide
  },
  data(){
    return {
      isOpen: false
    }
  },
  watch: {
    isOpen(val){
      console.log(val, "=WATCH isOpen")
    }
  },
  methods: {
    closeMenu(){
      console.log(this.isOpen, "= closeMenu")
      this.isOpen = false
    },
    handleOpenMenu(){
      this.isOpen = true
      console.log(`HANDLE_OPEN: Menu OPENED, status: ${this.isOpen}`)
    },
    // handleCloseMenu(){
    //   console.log(`HANDLE_CLOSE: Menu CLOSED, status: ${this.isOpen}`)
    // }
  },
  mounted(){
    console.log(this.isOpen, "Mounted")
  }
}

</script>

<style>
.bm-menu {
  background-color: #b3d4fc;
  padding-top: 0px;
}
</style>
