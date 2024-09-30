import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    // Sign up logic here
    // Redirect to login on success
    navigate("/");
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
      <button onClick={handleSignup}>Sign Up</button>
      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};

export default Signup;
