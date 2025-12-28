import axios from "axios";
const BASE_URL = "/api/persons";

export const getAll = () => {
  return axios.get(BASE_URL);
};
export const create = ({ name, number }) => {
  return axios.post(BASE_URL, {
    name,
    number,
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
