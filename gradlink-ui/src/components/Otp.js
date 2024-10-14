import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthMutation from '../hooks/useAuthMutation';
import '../styles/otp.css';

const Otp = () => {
    const location = useLocation();
    const email = location.state?.email || ""; // Retrieve email from location state
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [mssg , setMssg] = useState("");
    const [errormsg, setErrorMsg] = useState("");
    const [attempts, setAttempts] = useState(0); // State to track the number of attempts
    const [counter, setCounter] = useState(0);
    const sendOtpMutation = useAuthMutation('http://localhost:5000/api/auth/sendOtp');
    const validateOtpMutation = useAuthMutation('http://localhost:5000/api/auth/validate-otp');

    const sendOtp = async () => {
        setErrorMsg("");
        setError("");
        setMssg("Sending Otp");
        try {
            const response = await sendOtpMutation.mutateAsync({ email });
            console.log('OTP sent successfully:', response);
            setCounter(59);
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const validateOtp = async () => {
        if(otp.join('').length < 6){
            setErrorMsg("Please enter a valid OTP");
            setLoading(false);
            return;
        }
        try {
            const response = await validateOtpMutation.mutateAsync({ email, otp: otp.join('') });
            setMssg('OTP validated successfully. Navigating to dashboard');
            await delay(5000);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error validating OTP:', error);
            setAttempts((prevAttempts) => prevAttempts + 1); // Increment attempts
            setErrorMsg("Invalid OTP. Please try again.");
            // Check if the attempts exceed the maximum limit
            if (attempts + 1 >= 3) {

                setErrorMsg('Maximum attempts exceeded. Go back to login.');
                // Navigate back to signup after 3 attempts
            }
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (email === '') {
            navigate('/signup');
        }
        sendOtp(email);
    }, [email]);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);

    }, [counter])

    const handleResendOtp = () => {
        setLoading(true); // Show loader while resending OTP
        sendOtp(email);
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
        setOtp(newOtp);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace and arrow key navigation
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            // Move focus to the previous input if backspace is pressed and current input is empty

            const prevInput = document.getElementsByClassName("otp-input")[index - 1];
            if (prevInput) {
                prevInput.focus();
            }
        } else if (e.key === 'ArrowRight' && index < otp.length - 1) {
            // Move focus to the next input if right arrow is pressed
            const nextInput = document.getElementsByClassName("otp-input")[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            // Move focus to the previous input if left arrow is pressed
            const prevInput = document.getElementsByClassName("otp-input")[index - 1];
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);
        validateOtp();
    };

    return (
        <div className="otp-container">
            {loading ? (
                <div className="loader">
                    <div className="spinner"></div>
                    <div>{mssg}</div>
                </div>
            ) : error ? (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            ) : (
                <div className="otp-form">
                    <h2>Please check your email</h2>
                    <p>We've sent a code to {email}.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="otp-input-container">
                            {otp.map((data, index) => (
                                <input
                                    className="otp-input"
                                    type="text"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)} // Handle key down events
                                />
                            ))}
                        </div>
                        {attempts < 3 && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                            <p className="attempt-count" style={{ color: 'red' }}>
                                {
                                    attempts != 0 ? `Incorrect attempts: ${attempts}/3` : null
                                }

                            </p>
                            <p>{counter == 0 ? (
                                <button className="resend-otp" onClick={handleResendOtp}>Click to resend</button>
                            ) : (
                                <>
                                    <span>Resend otp in</span><span style={{ color: 'green' }}> 00:{counter}</span>
                                </>
                            )}</p>

                        </div>
                        }
                        <p style={{ textAlign: 'center', color: 'red' }}>{errormsg}</p>
                        {attempts < 3 && <button className="verify-btn" type="submit">Verify</button>}
                    </form>
                </div>
            )}
        </div>
    );
};

export default Otp;
