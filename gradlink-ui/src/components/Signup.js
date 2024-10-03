import React, { useEffect, useRef, useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles/signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [username, email, password, college]);

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

    if (!college) {
      formIsValid = false;
      errors["college"] = "Please select a college";
    }

    setErrors(errors);
    setIsFormValid(formIsValid);
  };

 

 
  
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        {
          username,
          email,
          password,
          college,
          role,
        }
      );
      if (response.status === 201) {
        navigate("/otp" , {state: {email}});
      }
    } catch (error) {
      setErrors({ form: error.response.data });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/otp" , {state: {email}});
    // if (!isFormValid) return;
    // await handleSignup();
  };

  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <div className="auth-form">
        <div className="gradlink-logo">GradLink</div>
        <p className="auth-subtitle">Join your college alumni network</p>
        <h2>Sign Up</h2>
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

        <select value={college} onChange={(e) => setCollege(e.target.value)}>
          <option value="">Select College</option>
          <option value="60d0fe4f5311236168a109ca">IIT Bombay</option>
          <option value="60d0fe4f5311236168a109cb">IIT Delhi</option>
          <option value="60d0fe4f5311236168a109cc">IIT Kanpur</option>
          <option value="60d0fe4f5311236168a109cd">IIT Kharagpur</option>
          <option value="60d0fe4f5311236168a109ce">IIT Madras</option>
          <option value="60d0fe4f5311236168a109cf">IIT Roorkee</option>
          <option value="60d0fe4f5311236168a109d0">IIT Guwahati</option>
        </select>
        {errors.college && (
          <div className="error-message">{errors.college}</div>
        )}
        <div className="input-group">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>
        {errors.form && <div className="error-message">{errors.form}</div>}
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
          <button type="submit">
            Sign Up
          </button>
      </div>
    </form>
  );
};

export default Signup;
