import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserAdded = () => {
    setRefresh(!refresh);
    setSelectedUser(null);
  };

  const handleUserEdited = () => {
    setRefresh(!refresh);
    setSelectedUser(null);
  };

  return (
    <div className="container mt-4">
      <UserForm
        onUserAdded={handleUserAdded}
        onUserEdited={handleUserEdited}
        selectedUser={selectedUser}
      />
      <UserList onUserEdited={handleUserEdited} />
    </div>
  );
};

export default App;