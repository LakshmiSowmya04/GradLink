import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/signup.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [role, setRole] = useState("student"); // Default role

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const otpInputs = useRef([]);

  useEffect(() => {
    validateForm();

  }, [email, password, college, otp]);

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

    if (otpSent && otp.some(digit => digit === "")) {
      formIsValid = false;
      errors["otp"] = "Please enter the complete OTP";
    }

    setErrors(errors);
    setIsFormValid(formIsValid);
    checkPasswordStrength(password);

  }, [username, email, password, college, role])

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!role) newErrors.role = "Role is required";
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);

  };

  // const checkPasswordStrength = (password) => {
  //   const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  //   const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

  //   if (strongRegex.test(password)) {
  //     setPasswordStrength("strong");
  //   } else if (mediumRegex.test(password)) {
  //     setPasswordStrength("medium");
  //   } else {
  //     setPasswordStrength("weak");
  //   }
  // };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;


  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleResendOtp = () => {
    console.log("Resending OTP...");
  };

  const handleSignup = () => {
    if (isFormValid) {
      navigate("/dashboard");

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        username,
        email,
        password,
        college,
        role,
      });
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      setErrors({ form: error.response.data });

    }
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
          {errors.username && <div className="error-message">{errors.username}</div>}
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* {errors.password && <div className="error-message">{errors.password}</div>} */}
          {passwordStrength && (

          {errors.password && <div className="error-message">{errors.password}</div>}
          {/* {passwordStrength && (

            <div className={`password-strength strength-${passwordStrength}`}>
              Password strength: {passwordStrength}
            </div>
          )} */}
        </div>
        <div className="input-group">

          <select value={college} required onChange={(e) => setCollege(e.target.value)}>
            <option value="">Select College</option>
            <option value="college1">College 1</option>
            <option value="college2">College 2</option>
          </select>
          {/* {errors.college && <div className="error-message">{errors.college}</div>} */}
        </div>
        {otpSent && (
          <div className="input-group">
            <label htmlFor="otp-input">Enter OTP</label>
            <div className="otp-input-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  ref={(el) => (otpInputs.current[index] = el)}
                  className="otp-input"
                />
              ))}
            </div>
            {errors.otp && <div className="error-message">{errors.otp}</div>}
            <a href="/" onClick={handleResendOtp} className="resend-otp">Resend OTP</a>
          </div>
        )}
        {!otpSent ? (
          <button onClick={handleSendOtp} disabled={!email || errors.email}>Send OTP</button>
        ) : (
          <button onClick={handleSignup} disabled={!isFormValid}>Sign Up</button>
        )}

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
          {errors.college && <div className="error-message">{errors.college}</div>}
        </div>
        <div className="input-group">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>
        {errors.form && <div className="error-message">{errors.form}</div>}
        <button type="submit" disabled={!isFormValid}>Sign Up</button>

        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </form>
  );
};

export default Signup;