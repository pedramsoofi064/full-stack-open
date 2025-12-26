import axios from "axios";
const BASE_URL = "http://localhost:3001/persons";

export const getAll = () => {
  return axios.get(BASE_URL);
};
export const create = ({ name, number }) => {
  const id = Date.now();
  return axios.post(BASE_URL, {
    name,
    number,
    id: String(id),
  });
};
export const update = ({ id, name, number }) => {
  return axios.put(`${BASE_URL}/${id}`, {
    name,
    number,
  });
};
export const remove = ({ id }) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
};
