import axios from 'axios'
// const pa = axios.create()

// const URL_ = "https://5e953027f591cb0016d817d1.mockapi.io/api/tasks/"
// const URL = "http://localhost:3005/todos"
const URL = "http://localhost:8080/todos" // Proxy uses frontend base URL then the rest of backend url
const COMMENTS_URL = "http://localhost:8080/comments"

export function fetchAllComments(id) {
  return axios.get(`${URL}/${id}/comments`)
}
export function addNewComment(payload){
  return axios.post(COMMENTS_URL, {
    ...payload
  })
}
//TODO - Might not be needed anymore. UPDATE By COLUMN
export function updateSingleColumn(payload){
  let load = {}
  const id = payload.key
  load[payload.value.name] = payload.value.value

  return axios.put(`${COMMENTS_URL}/${id}`, load)
}
// UPDATE MULTIPLE COLUMNS
export function updateMultipleColumns(payload){
  const id = payload.key
  const load = payload.value

  return axios.put(`${COMMENTS_URL}/${id}`, load)
}
