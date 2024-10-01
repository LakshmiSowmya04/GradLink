import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/signup.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [email, password, college]);

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!email) {
      formIsValid = false;
      errors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      errors["email"] = "Email is invalid";
    }

    if (!password) {
      formIsValid = false;
      errors["password"] = "Password is required";
    } else if (password.length < 8) {
      formIsValid = false;
      errors["password"] = "Password must be at least 8 characters";
    }

    if (!college) {
      formIsValid = false;
      errors["college"] = "Please select a college";
    }

    setErrors(errors);
    setIsFormValid(formIsValid);
  };

  const handleLogin = () => {
    if (isFormValid) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="gradlink-logo">GradLink</div>
        <p className="auth-subtitle">Connect with your college community</p>
        <h2>Login</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        <div className="input-group">
          <select value={college} onChange={(e) => setCollege(e.target.value)}>
            <option value="">Select College</option>
            <option value="college1">College 1</option>
            <option value="college2">College 2</option>
          </select>
          {errors.college && <div className="error-message">{errors.college}</div>}
        </div>
        <button onClick={handleLogin} disabled={!isFormValid}>Login</button>
        <p>
          New to GradLink? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;