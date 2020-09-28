import { 
  fetchAllComments,
  addNewComment,
  updateMultipleColumns
  // updateCommentByColumn
} from '@/util/services/commentsService.js'

// commit helper
const set = (commit, type, value) => {
  commit('set', { key: type, value: value })
}

export const actions = {
  // GET ALL
  actionFetchAllComments({commit}, payload){
    set(commit, 'showLoader', true)

    fetchAllComments(payload)
      .then((res) => {
        set(commit, 'commentsData', res.data)
        set(commit, 'showLoader', false)
      })
  },
  // ADD NEW
  actionAddNewComment({commit, dispatch}, payload){
    set(commit, 'showLoader', true)

    addNewComment(payload)
      .then((res) => {
        set(commit, 'concatToCommentsData', res.data)
        dispatch('actionFetchAllComments', res.data.commentable_id) // Refetch all cards
      })
  },
  // UPDATE COLUMN
  actionCommentUpdateColumn({commit, dispatch}, payload){
    set(commit, 'showLoader', true)
    const taskId = payload[0]
    const load = payload[1]

    // updateCommentByColumn(load)
    updateMultipleColumns(load)
    .then(() => {
      dispatch('actionFetchAllComments', taskId) // Refetch
      set(commit, 'showLoader', false)
    })
  },

}