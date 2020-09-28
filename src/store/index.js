import Vue from 'vue'
import Vuex from 'vuex'

import tasks from '@/store/modules/tasks/index'
import projects from '@/store/modules/projects/projectIndex'
import comments from '@/store/modules/comments/commentIndex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tasks,
    projects,
    comments
  },
})
