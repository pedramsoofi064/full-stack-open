import axios from 'axios'
const baseUrl = '/api/blogs'

const headerConfig = {
  headers: {
    Authorization: ''
  }
}
const setToken = userToken => headerConfig.headers.Authorization = `bearer ${userToken}`
const getAll = async () => {
  const response = await axios.get(baseUrl, headerConfig)
  return response.data
}

const create = async (data) => {
  const response = await axios.post(baseUrl, data, headerConfig)
  return response.data
}

const edit = async (data) => {
  const url = `${baseUrl}/${data.id}`
  const response = await axios.put(url, data, headerConfig)
  return response.data
}


const remove = async (id) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, headerConfig)
  return response
}

export default { getAll, setToken, create, edit ,remove }