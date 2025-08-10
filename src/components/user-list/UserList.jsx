import React, { useState } from 'react'
import { deleteUser } from '../../service/userService';
import toast from 'react-hot-toast';

const UserList = ({users, setUsers}) => {

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const deleteUserById = async (userId) => {

    try {
      
      await deleteUser(userId);

      setUsers(prevUsers => prevUsers.filter(user => user.userId !== userId))

      toast.success("User successfully deleted")
    } catch (error) {
      
      console.log(error);
      toast.error("Unable to delete the user");
    } 
  }
  return (
    <div
      className="category-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >

      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="search by keyboard"
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="row g-3 pe-2">
        
        {filteredUsers.map((user, idx) => (

          <div key={idx} className='col-12'>

            <div className="card p-3 bg-black">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">
                    {user.name}
                  </h5>
                  <p className="mb-0 text-white">
                    {user.email}
                  </p>
                </div>

                <div>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteUserById(user.userId)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList