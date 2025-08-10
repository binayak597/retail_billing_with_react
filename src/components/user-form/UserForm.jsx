import React, { useState } from "react";
import toast from "react-hot-toast";
import { addUser } from "../../service/userService";

const UserForm = ({setUsers}) => {

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER"
  });

  const handleChange = (ev) => {

    const {name, value} = ev.target;

    setData((prevData) => (
      {
        ...prevData,
        [name]: value
      }
    ))
  }

  const handleSubmit = async (ev) => {

    ev.preventDefault();

    try {

      setLoading(true);

      const response = await addUser(data);

      setUsers((prevUsers) => [...prevUsers, response.data]);
      toast.success("User added successfully");
      setData({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER"
      })
      
    } catch (error) {
      
      console.log(error);
      toast.error("Error loading user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-12 form-container">
            <div className="card-body">
              <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="John Doe"
                    onChange={handleChange}
                    value={data.name}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    value={data.email}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="************"
                    onChange={handleChange}
                    value={data.password}
                  />
                </div>

                <button className="btn btn-warning w-100" disabled={loading}>
                  
                  {loading? "Loading": "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
