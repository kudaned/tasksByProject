import { actions } from './actions/actions'
import { getters } from './getters'

const initialState = {
    tasksData: [],
    todaysData: [],
    showLoader: false,
    showBtnLoader: false
}

const mutations = {
  set(state, payload) {
    state[payload.key] = payload.value
  },
  updateStatus(state, payload){
    state.tasksData.filter((t) => t.id == payload.key )[0].status = payload.value
  },
  appendToState(state, payload){
    state[payload.name].push(payload.value)
  },
  concatToTaskData(state, value){
    state.tasksData = state.tasksData.concat(value)
  },
  // Reset any array to empty
  resetToEmptyArray(state, payload){
    state[payload] = []
  },
}

export default {
    namespaced: true,
    state: Object.assign({}, initialState),
    actions,
    mutations,
    getters
}