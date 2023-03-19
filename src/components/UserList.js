import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://altcord.com:3030');

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit('get users');
  }, []);

  useEffect(() => {
    socket.on('get users', (data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <h2>Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
