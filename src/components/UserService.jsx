import axios from 'axios';

const API_URL = 'http://localhost:3001/users';

const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addUser = async (user) => {
  await axios.post(API_URL, user);
};

const editUser = async (userId, user) => {
  await axios.put(`${API_URL}/${userId}`, user);
};

const deleteUser = async (userId) => {
  await axios.delete(`${API_URL}/${userId}`);
};

export default {
  getUsers,
  addUser,
  editUser,
  deleteUser,
};
