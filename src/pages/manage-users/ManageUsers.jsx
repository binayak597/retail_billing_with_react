import React, { useEffect, useState } from 'react'
import './ManageUsers.css'
import UserForm from '../../components/user-form/UserForm'
import UserList from '../../components/user-list/UserList'
import { fetchUsers } from '../../service/userService'

const ManageUsers = () => {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    async function getUsers() {

      try {
        
        setLoading(true);
        const response = await fetchUsers();

        setUsers(response.data);
      } catch (error) {
        
        console.log(eror);
        toast.error("Unable to fetch users");
      } finally {

        setLoading(false);
      }

    }

    getUsers();

  }, []);
  return (
    <div className="users-container text-light">

      <div className="left-column">
        <UserForm setUsers = {setUsers} />
      </div>
      <div className="right-column">
        <UserList users = {users} setUsers = {setUsers} />
      </div>
    </div>
  )
}

export default ManageUsers