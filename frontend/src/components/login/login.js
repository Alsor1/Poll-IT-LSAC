import React, {useState} from 'react'
import "./login.css"
import close from '../../assets/X.png'

export default function Login({open, onClose}) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    
    const handleLogin = async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('email-input');
      if (emailInput.validity.valid) {
        try {
          const response = await fetch('http://localhost:3001/poll-it/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
  
          if (response.status === 200) {
            const { user } = await response.json();
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user.userId);
            console.log('Login successful');
            window.location.reload();
          } else {
            console.error('Login failed');
          }
        } catch (error) {
          console.error('Error', error);
        }
      } else {
        alert('Invalid email!');
      }
    };

      if(!open) return null
  return (
    <>
        <div className='overlay-styles-login' onClick={onClose}/>
        <div className='modal-styles-login'>
        <img src={close} alt="close" className='close-btn' onClick={onClose}/><br></br>
        <h1 className='login-title'>Login</h1>

        <form className='form-style-login'>
                <input
                type="email"
                name="email"
                id="email-input"
                placeholder='Email'
                className='input-style-login'
                onChange={(e)=>setEmail(e.target.value)}></input><br></br>

                <input
                type="password"
                name="password"
                id="password-input"
                placeholder='Password'
                className='input-style-login'
                onChange={(e)=>setPassword(e.target.value)}></input><br></br>

                <div className='spacing-button-login'/>

                <button className='login-submit' onClick={handleLogin}>Login</button>
            </form>
        </div>
    </>
  )
}
