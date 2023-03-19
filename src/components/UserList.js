import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import io from 'socket.io-client';

const socket = io('http://localhost:3030');

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
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
