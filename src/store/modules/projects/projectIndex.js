import { actions } from './projectActions'
import { getters } from './projectGetters'

const initialState = {
    projectsData: [],
    projectTops: [],
    showLoader: false
}

const mutations = {
  set(state, payload){
    state[payload.key] = payload.value
  },
  mutateColumn(state, payload){
  // this.mutateColumn({ key: this.arrayId, value: { id: id, column: 'favorite', value: favStatus }})
    state.projectsData[payload.key].tasks.filter((t) => t.id == payload.value.id )[0][payload.value.column] = payload.value.value
  },
  // TODO NIU
  updateStatus(state, payload){
    state.projectsData[payload.key].tasks.filter((t) => t.id == payload.value.key )[0].status = payload.value.value
  },
  // Reset any array to empty
  resetToEmptyArray(state, payload){
    state[payload] = []
  },
  // TODO NIU
  concatToProjectTasks(state, value){
    state.projectsData[value.key].tasks = state.projectsData[value.key].tasks.concat()
  },
}

export default {
  namespaced: true,
  state: Object.assign({}, initialState),
  actions,
  mutations,
  getters
}