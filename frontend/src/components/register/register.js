import React, {useState} from 'react'
import "./register.css"
import close from '../../assets/X.png'

export default function Register({open, onClose}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e) => {
      e.preventDefault();
      if(password === confirmPassword){
        try{
          const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
          })
          if(response.status===201){
            console.log('User registered successfully');
          } else{
            console.error('Error registering user');
          }
        }catch (error){
            console.error('Error: ', error);
        }
      }else{
        alert("Passwords do not match")
      }
    };
    

      if(!open) return null
  return (
    <>
        <div className='overlay-styles' onClick={onClose}/>
        <div className='modal-styles'>
        <img src={close} alt="close" className='close-btn' onClick={onClose}/><br></br>
        <h1 className='register-title'>Register</h1>

        <form className='form-style'>
                <input
                type="text"
                name="email"
                id="email-input"
                placeholder='Email'
                className='input-style-register'
                value={email}
                onChange={(e) => setEmail(e.target.value)}></input><br></br>

                <input
                type="password"
                name="password"
                id="password-input"
                placeholder='Password'
                className='input-style-register'
                value={password}
                onChange={(e) => setPassword(e.target.value)}></input><br></br>

                <input
                type="password"
                name="confirmPassword"
                id="confirm-password-input"
                placeholder='Confirm password'
                className='input-style-register'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}></input><br></br>

                <div className='spacing-button'/>

                <button className='register-submit' onClick={handleRegister}>Create Account</button>
            </form>
        </div>
    </>
  )
}
