import React, { useState, useEffect } from 'react';
import '../index.css';
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
    <div className="user-list-container">
      <div className="user-list">
        <div className="user-list-header">
          <h2>Users:</h2>
        </div>
        <div className="user-list-body">
          {users.map((user, index) => (
            <div className="user-list-item" key={index}>
              {user}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
