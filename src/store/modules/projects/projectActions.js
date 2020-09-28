import { 
  fetchAll,
  fetchTops,
  addNewProject,

  addNewProjectTask,
  updateProjectTaskByColumn,
  updateProjectTaskStatus,
  updateProjectTaskDesc,
  deleteProjectTask
} from '@/util/services/projects.js'

// commit helper
const set = (commit, type, value) => {
  commit('set', { key: type, value: value })
}

export const actions = {
  // INDEX
  fetchAllProjects({commit}, payload){
    set(commit, 'showLoader', true)

    fetchAll(payload)
    .then(res => {
      set(commit, 'projectsData', res.data)
      set(commit, 'showLoader', false)
    })
  },
  // GET TOPS
  actionFetchTops({commit}, payload){
    set(commit, 'showLoader', true)

    fetchTops(payload.id)
    .then(res => {
      set(commit, 'projectTops', res.data)
      set(commit, 'showLoader', false)
    })
  },
  // ADD NEW PROJECT
  actionNewProject({commit, dispatch}, payload){
    set(commit, 'showLoader', true)

    addNewProject(payload)
    .then(() => {
      dispatch('fetchAllProjects') // Refetch all cards
      set(commit, 'showLoader', false)
    })
  },

  /**
   *
   * TASKS
   *  
   */

  // ADD NEW TASK
  addNewTask({commit, dispatch}, payload){
    set(commit, 'showLoader', true)

    addNewProjectTask(payload)
    .then(() => {
      dispatch('fetchAllProjects') // Refetch all cards
      set(commit, 'showLoader', false)
    })
  },
  // UPDATE GENERAL
  updateTaskColumn({commit, dispatch}, payload){
    set(commit, 'showLoader', true)

    updateProjectTaskByColumn(payload)
    .then(() => {
      //TODO linter complains about commit
      dispatch('fetchAllProjects') // Refetch all cards
      set(commit, 'showLoader', false)
    })
  },
  // UPDATE STATUS
  updateTaskStatus({commit, dispatch}, payload){
    // set(commit, 'showLoader', true)
    const id = payload.key
    const status = payload.value

    updateProjectTaskStatus(id, status)
    .then(() => {
      //TODO linter complains about commit
      dispatch('fetchAllProjects') // Refetch all cards
      set(commit, 'showLoader', false)
    })
  },
  // UPDATE DESC
  updateTaskDesc({commit, dispatch}, payload){
    // set(commit, 'showLoader', true)
    const id = payload.key
    const desc = payload.value

    updateProjectTaskDesc(id, desc)
    .then(() => {
      //TODO linter complains about commit
      dispatch('fetchAllProjects') // Refetch all cards
      set(commit, 'showLoader', false)
    })
  },
  // DELETE
  deleteTaskAction({commit, dispatch}, payload){
    set(commit, 'showLoader', true)
    const id = payload.key

    deleteProjectTask(id)
    .then(() => {
      dispatch('fetchAllProjects') // Refetch all cards
      set(commit, 'showLoader', false)
    })
  },

}