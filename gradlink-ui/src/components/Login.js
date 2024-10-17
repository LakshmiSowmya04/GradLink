import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthMutation from "../hooks/useAuthMutation";
import "../styles/signup.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useAuthMutation(`${process.env.REACT_APP_API_URL}/api/auth/login`);

  useEffect(() => {
    validateForm();
  }, [username, email, password]);

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!username) {
      formIsValid = false;
      errors["username"] = "Username is required";
    }

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

    setErrors(errors);
    setIsFormValid(formIsValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await loginMutation.mutateAsync({ username, password });
      if (response) {
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors({ form: error.response?.data || "An error occurred during login" });
    }
  };

  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <div className="auth-form">
        <div className="gradlink-logo">GradLink</div>
        <p className="auth-subtitle">Connect with your college community</p>
        <h2>Login</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <div className="error-message">{errors.username}</div>
          )}
        </div>
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
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        <button type="submit" disabled={!isFormValid}>
          Login
        </button>
        {errors.form && <div className="error-message">{errors.form}</div>}
        <p>
          New to GradLink? <a href="/signup">Sign up</a>
        </p>
      </div>
    </form>
  );
};

export default Login;
