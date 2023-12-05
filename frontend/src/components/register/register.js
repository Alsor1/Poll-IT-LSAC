import React, { useState } from 'react';
import './register.css';
import close from '../../assets/X.png';
import axios from 'axios';

export default function Register({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // This should already be declared in your API file


  const handleRegister = async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email-input');
    if (emailInput.validity.valid) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post('http://localhost:3001/poll-it/users', {
            email,
            password,
          });

          if (response.status === 201) {
            console.log('User registered successfully');
          } else if (response.status === 409) {
            console.error('User already exists');
          } else {
            console.error('Error registering user');
          }
        } catch (error) {
          console.error('Error: ', error);
        }
      } else {
        alert('Passwords do not match');
      }
    } else {
      alert('Invalid email!');
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="overlay-styles" onClick={onClose} />
      <div className="modal-styles">
        <img src={close} alt="close" className="close-btn" onClick={onClose} />
        <br />
        <h1 className="register-title">Register</h1>

        <form className="form-style">
          <input
            type="email"
            name="email"
            id="email-input"
            placeholder="Email"
            className="input-style-register"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            name="password"
            id="password-input"
            maxLength={32}
            minLength={8}
            placeholder="Password"
            className="input-style-register"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password-input"
            placeholder="Confirm password"
            className="input-style-register"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <div className="spacing-button" />
          <button className="register-submit" onClick={handleRegister}>
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}
