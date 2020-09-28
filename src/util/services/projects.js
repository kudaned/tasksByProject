import axios from 'axios'
const pa = axios.create()

const URL = "http://localhost:8080/projects" // Proxy uses frontend base URL then the rest of backend url
const TODO_URL = "http://localhost:8080/todos" // Proxy uses frontend base URL then the rest of backend url

// GET ALL
export function fetchAll() {
  return pa.get(URL)
}
// GET TOPS
export function fetchTops(id) {
  return pa.get(`${URL}/${id}/tops`)
}
// ADD NEW
export function addNewProject(payload) {
  return axios.post(URL, {
    ...payload
  })
}


/*********** TASK RELATED  ************/
// ADD NEW TASK
export function addNewProjectTask(payload) {
  return axios.post(TODO_URL, {
    ...payload
  })
}
// UPDATE STATUS
export function updateProjectTaskStatus(id, status) {
  return axios.put(`${TODO_URL}/${id}`, {
    status: status
  })
}
// UPDATE DESC
export function updateProjectTaskDesc(id, desc) {
  return axios.put(`${TODO_URL}/${id}`, {
    desc: desc
  })
}
// UPDATE By COLUMN
export function updateProjectTaskByColumn(payload){
  let load = {}
  const id = payload.key
  load[payload.value.name] = payload.value.value

  return axios.put(`${TODO_URL}/${id}`, load)
}
// DELETE TASK
export function deleteProjectTask(id, payload) {
  return axios.delete(`${TODO_URL}/${id}`, {
    ...payload
  })
}
