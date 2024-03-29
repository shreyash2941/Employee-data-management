import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email);

      const emailCheckResponse = await axios.get(
        `http://localhost:3001/usersLogin?email=${email}`
      );

      if (emailCheckResponse.data.length > 0) {
        alert("Email already exists. Please choose a different email.");
        return;
      }

      await axios.post("http://localhost:3001/usersLogin", {
        username,
        password,
        email,
      });

      alert("User signed up successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
