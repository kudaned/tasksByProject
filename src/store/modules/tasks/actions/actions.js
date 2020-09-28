import * as service from '@/util/services/tasks.js'
import { 
  fetchTasks, 
  updateTaskStatus, 
  addNewTask, 
  deleteTask,
  updateDesc,
  fetchAllTodays,

  updateTaskByColumn
} from '@/util/services/tasks.js'
// import { 
//   fetchAll
// } from '@/util/services/projects.js'

// commit helper
const set = (commit, type, value) => {
  commit('set', { key: type, value: value })
}
// File download via post
function openDoc(blob, fileName) {
  var a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = fileName
  a.click()
}

export const actions = {

  // UPDATE COLUMN
  actionUpdateTaskColumn({commit, dispatch}, payload){
    set(commit, 'showLoader', true)

    updateTaskByColumn(payload)
    .then(() => {
      dispatch('actionFetchTodays') // Refetch all cards
      set(commit, 'showLoader', false)
    })
  },

  // INDEX
  fetch({commit}, payload){
    set(commit, 'showLoader', true)

    fetchTasks(payload)
    .then(res => {
      set(commit, 'tasksData', res.data)
      set(commit, 'showLoader', false)
    })
    // fetchAll(payload)
    // .then(res => {
    //   set(commit, 'projectsData', res.data)
    //   set(commit, 'showLoader', false)
    // })
  },
  // ADD
  // addNew({commit, dispatch}, payload){
  addNew({commit, rootActions}, payload){
    set(commit, 'showLoader', true)

    addNewTask(payload)
    .then((res) => {
      console.log(rootActions, ' - root -')
      console.log(res.data)
      commit('projects/concatToTaskData', res.data)
      // dispatch('fetch') // Refetch all cards
      set(commit, 'showLoader', false)
    })
  },
  // UPDATE STATUS
  updateTaskStatus({commit}, payload){
    // set(commit, 'showLoader', true)
    const id = payload.key
    const load = payload.value

    updateTaskStatus(id, load)
    .then(() => {
      //TODO linter complains about commit
      set(commit, 'showLoader', false)
    })
  },
  // UPDATE DESC
  updateDesc({commit, dispatch}, payload){
    // set(commit, 'showLoader', true)
    const id = payload.key
    const desc = payload.value

    updateDesc(id, desc)
    .then(() => {
      //TODO linter complains about commit
      dispatch('fetch') // Refetch all cards
      set(commit, 'showLoader', false)
    })
  },
  // DELETE
  deleteTaskAction({commit, dispatch}, payload){
    set(commit, 'showLoader', true)
    const id = payload.key

    deleteTask(id)
    .then(() => {
      dispatch('fetch') // Refetch all cards
      set(commit, 'showLoader', false)
    })
  },

  // actionFetchTodays({commit, dispatch}, payload){
  actionFetchTodays({commit}, payload){
    set(commit, 'showLoader', true)

    fetchAllTodays(payload)
    .then(res => {
      set(commit, 'todaysData', res.data)
      // dispatch('fetch') // Refetch all cards
      set(commit, 'showLoader', false)
    })
  },






  // OLDER BOILERPLATE
  searchTasks({commit}, payload) {
      const errMsg = 'There was an issue searchng for tasks'
      set(commit, 'showLoader', true)
      set(commit, 'searchCount', 0)

      service.search(payload)
      .then(res => {
          if(res.status === 200){
              set(commit, 'tasks', res.data.tasks)
              set(commit, 'searchCount', res.data.count)
              set(commit, 'showLoader', false)
          } else { 
              set(commit, 'errorMsg', errMsg)
          }
      })
      .catch((err) => {
          set(commit, 'showLoader', false)
          console.error('ERROR! in Tasks' + err.message)
          console.error(err.message)
      })
  },

  downloadTasks({commit}, payload) {
      const errMsg = 'There was an issue downloading the file'
      set(commit, 'showLoader', true)

      service.download(payload)
      .then(res => {
          if(res.status === 200){
              const fileDisp = res.headers['content-disposition']
              const fileName = fileDisp.substring(22, fileDisp.length - 1)
              const blob = new Blob([res.data], { type: '' })
              set(commit, 'showLoader', false)
              openDoc(blob, fileName)
          } else { 
              set(commit, 'errorMsg', errMsg)
          }
      })
      .catch((err) => {
          set(commit, 'showLoader', false)
          console.error('ERROR! in Tasks' + err.message)
          console.error(err.message)
      })
  }
}