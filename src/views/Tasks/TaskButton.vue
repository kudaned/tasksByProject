<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        class="ma-2"
        close
        :color="attrs['colors'][status]"
        :loading="dialog"
        text-color="white"
        @click="handleClick()"
        small
        rounded
        outlined
        v-on="on"
      >
        <!-- {{compText()}} -->
        <v-icon dark>
          {{ attrs['icons'][status]}}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ attrs['tooltips'][status] }}</span>
  </v-tooltip>
</template>

<script>
//  {'labels': { 'unstarted': '', 'started': '', 'closed': '', 'requeue': '' }},
const attrs = {
  'colors': { 
    'unstarted': 'blue', 
    'started': 'green', 
    'closed': 'grey', 
    'requeue': 'red', 
    'archive': 'grey' 
  },
  'icons': { 
    'unstarted': 'mdi-ray-start-arrow', 
    'started': 'mdi-check', 
    'closed': 'mdi-restart', 
    'requeue': 'mdi-restart', 
    'archive': 'mdi-archive' 
  },
  'tooltips': { 
    'unstarted': 'Start', 
    'started': 'Complete', 
    'closed': 'Move back to Complete', 
    'requeue': 'Move back to Up Next', 
    'archive': 'Archive'
  }
}

export default {
  props: {
    id: String,
    status: String,
    callback: Function
  },
  data(){
    return{
      attrs: attrs,
      dialog: false
    }
  },
  methods: {
    handleClick(){
      this.dialog = true
      setTimeout(() => (
        this.dialog = false,
        this.callback(this.id, this.status)
      ), 400)
    }
  }
}
</script>