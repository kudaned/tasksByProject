// HELPERS
function checkForZero(count){
  return ( count > 0 ? count : 0 )
}
// function limitBy(arr, number){
//   return (arr.length === number);
// }
function limitBy2(arr){
  console.log(arr, '= ARR')
  return (arr.length == 2);
}

export const getters = {
  unstartedTasks: (state) => (id) => {
    return state.projectsData[id].tasks.filter(t => t.status === 'unstarted')
  },
  startedTasks: (state) => (id) => {
    return state.projectsData[id].tasks.filter(t => t.status === 'started')
  },
  completedTasks: (state) => (id) => {
    return state.projectsData[id].tasks.filter(t => t.status === 'closed')
  },
  archivedTasks: (state) => (id) => {
    return state.projectsData[id].tasks.filter(t => t.status === 'archived')
  },
  favoriteTasks: (state) => (id) => {
    return state.projectsData[id].tasks.filter(t => t.favorite == true)
  },
  // Status Lengths
  unstartedTasksLength: (state, getters) => (id) => {
    const count = getters.unstartedTasks(id).length
    return checkForZero(count)
  },
  startedTasksLength: (state, getters) => (id) => {
    const count = getters.startedTasks(id).length
    return checkForZero(count)
  },
  completedTasksLength: (state, getters) => (id) => {
    const count = getters.completedTasks(id).length
    return checkForZero(count)
  },
  archivedTasksLength: (state, getters) => (id) => {
    const count = getters.archivedTasks(id).length
    return checkForZero(count)
  },
  favoriteTasksLength: (state, getters) => (id) => {
    const count = getters.favoriteTasks(id).length
    return checkForZero(count)
  },
  // Active projects
  activeProjects: (state) => (arrId) => {
    const count = state.projectsData[arrId].tasks.filter(t => t.status !== 'archive').length
    return checkForZero(count)
  },
  // Limitt By - 
  // TODO Ideally this should be on the service side
  unstartedTasksOnly10: (state) => (id) => {
    const unstarted = state.projectsData[id].tasks.filter(t => t.status === 'unstarted')
    // return limitBy10(unstarted, 10)
    return unstarted.filter(limitBy2)
  },


}