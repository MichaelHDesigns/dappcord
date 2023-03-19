import React from 'react';
import styles from './UserList.module.css';

function UserList({ users }) {
  return (
    <div className={styles.container}>
      <h2>Users</h2>
      <ul className={styles.userList}>
        {users.map((user, index) => (
          <li key={index}>{user.address}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
