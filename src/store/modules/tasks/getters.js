export const getters = {
  unstartedTasks: (state) => {
    return state.tasksData.filter(t => t.status === 'unstarted')
  },
  startedTasks: (state) => {
    return state.tasksData.filter(t => t.status === 'started')
  },
  completedTasks: (state) => {
    return state.tasksData.filter(t => t.status === 'closed')
  }
}