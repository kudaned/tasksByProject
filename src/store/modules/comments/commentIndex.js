import { actions } from './commentActions'
import { getters } from './commentGetters'

const initialState = {
    commentsData: [],
    showLoader: false
}

const mutations = {
  set(state, payload){
    state[payload.key] = payload.value
  },
  mutateColumn(state, payload){
  // this.mutateColumn({ key: this.arrayId, value: { id: id, column: 'favorite', value: favStatus }})
    state.commentsData[payload.key].tasks.filter((t) => t.id == payload.value.id )[0][payload.value.column] = payload.value.value
  },
  // TODO NIU
  updateStatus(state, payload){
    state.commentsData[payload.key].tasks.filter((t) => t.id == payload.value.key )[0].status = payload.value.value
  },
  // Reset any array to empty
  resetToEmptyArray(state, payload){
    state[payload] = []
  },
  // TODO NIU
  concatToCommentsData(state, value){
    state.commentsData[value.key].tasks = state.commentsData[value.key].tasks.concat()
  },
}

export default {
  namespaced: true,
  state: Object.assign({}, initialState),
  actions,
  mutations,
  getters
}