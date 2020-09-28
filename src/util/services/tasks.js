import axios from 'axios'
const pa = axios.create()

// const URL_ = "https://5e953027f591cb0016d817d1.mockapi.io/api/tasks/"
// const URL = "http://localhost:3005/todos"
const URL = "http://localhost:8080/todos" // Proxy uses frontend base URL then the rest of backend url

// UPDATE By COLUMN
export function updateTaskByColumn(payload){
  let load = {}
  const id = payload.key
  load[payload.value.name] = payload.value.value

  return axios.put(`${URL}/${id}`, load)
}

// GET ALL
export function fetchTasks() {
  return pa.get(URL)
}
// ADD NEW TASK
export function addNewTask(payload) {
  return axios.post(URL, {
    ...payload
  })
}
// UPDATE STATUS
export function updateTaskStatus(id, payload) {
  return axios.put(`${URL}/${id}`, {
    ...payload
  })
}
// UPDATE DESC
export function updateDesc(id, desc) {
  return axios.put(`${URL}/${id}`, {
    desc: desc
  })
}
// DELETE TASK
export function deleteTask(id, payload) {
  return axios.delete(`${URL}/${id}`, {
    ...payload
  })
}
// FETCH TODAYS
export function fetchAllTodays(){
  return pa.get(`${URL}/todays`)
}

