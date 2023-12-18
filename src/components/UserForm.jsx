import React, { useState, useEffect } from 'react';
import UserService from './UserService';

const UserForm = ({ onUserAdded, onUserEdited, selectedUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setAge(selectedUser.age);
      setGender(selectedUser.gender);
    } else {
      setFirstName('');
      setLastName('');
      setAge('');
      setGender('');
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      age,
      gender,
    };

    if (selectedUser) {
      await UserService.editUser(selectedUser.id, newUser);
      onUserEdited();
    } else {
      await UserService.addUser(newUser);
      onUserAdded();
    }

    setFirstName('');
    setLastName('');
    setAge('');
    setGender('');
  };

  return (
    <div>
      <h2>{selectedUser ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Sobrenome:</label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Idade:</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Sexo:</label>
          <select
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {selectedUser ? 'Salvar Alterações' : 'Adicionar'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
