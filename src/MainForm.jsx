import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function MainForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: "",
  });

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedCourses = [...formData.courses];
    if (checked) {
      updatedCourses.push(value);
    } else {
      updatedCourses = updatedCourses.filter((course) => course !== value);
    }
    setFormData({ ...formData, courses: updatedCourses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/users/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:3001/users", formData);
      }
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        courses: [],
        image: "",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditingId(user.id);
  };
  return (
    <div>
      <h1>User Form</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            required
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleInputChange}
            />{" "}
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleInputChange}
            />{" "}
            Female
          </div>
        </div>
        <div className="form-group">
          <label>Courses:</label>
          <div>
            <input
              type="checkbox"
              name="courses"
              value="MCA"
              checked={formData.courses.includes("MCA")}
              onChange={handleCheckboxChange}
            />{" "}
            MCA
            <input
              type="checkbox"
              name="courses"
              value="BCA"
              checked={formData.courses.includes("BCA")}
              onChange={handleCheckboxChange}
            />{" "}
            BCA
            <input
              type="checkbox"
              name="courses"
              value="BSC"
              checked={formData.courses.includes("BSC")}
              onChange={handleCheckboxChange}
            />{" "}
            BSC
          </div>
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            required
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn">
          {editingId ? "Update" : "Submit"}
        </button>
      </form>
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Courses</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.designation}</td>
              <td>{user.gender}</td>
              <td>{user.courses.join(", ")}</td>
              <td>
                <img src={user.image} alt={user.name} className="user-image" />
              </td>
              <td>
                <button
                  onClick={() => handleEdit(user)}
                  className="btn btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainForm;
