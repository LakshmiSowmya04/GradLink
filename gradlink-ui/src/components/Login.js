import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validate and authenticate user here (add your logic)
    // Redirect to dashboard on success
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <select onChange={(e) => setCollege(e.target.value)}>
        <option value="">Select College</option>
        <option value="college1">College 1</option>
        <option value="college2">College 2</option>
      </select>
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
