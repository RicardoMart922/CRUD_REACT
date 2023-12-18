import React, { useState, useEffect } from 'react';
import UserService from './UserService';
import UserForm from './UserForm';

const UserList = ({ onUserEdited }) => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    UserService.getUsers().then((data) => {
      setUsers(data);
    });
  }, [onUserEdited]);

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setSelectedUser(userToEdit);
  };

  const handleDelete = async (userId) => {
    await UserService.deleteUser(userId);
    onUserEdited();
  };

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            <div className='d-flex justify-content-between'>
              <div>
                <strong>{user.firstName} {user.lastName}</strong><br />
                Idade: {user.age}, Sexo: {user.gender}
              </div>
              <div className="d-flex justify-content-end m-2">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(user.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {editingUserId && (
        <div className="mt-4">
          <UserForm
            onUserEdited={() => {
              setEditingUserId(null);
              setSelectedUser(null);
              onUserEdited();
            }}
            selectedUser={selectedUser}
          />
        </div>
      )}
    </div>
  );
};

export default UserList;
