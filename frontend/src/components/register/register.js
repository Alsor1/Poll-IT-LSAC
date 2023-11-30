import React, {useState} from 'react'
import "./register.css"
import close from '../../assets/X.png'

export default function Register({open, onClose}) {
    const[state, setState]= useState({});
    const update = event =>{
        const target = event.currentTarget
    
        setState({
          ...state,
          [target.name] : target.type === 'text' ? target.value : null
        })
      }

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
                onChange={update}></input><br></br>

                <input
                type="password"
                name="password"
                id="password-input"
                placeholder='Password'
                className='input-style-register'
                onChange={update}></input><br></br>

                <input
                type="password"
                name="confirmPassword"
                id="confirm-password-input"
                placeholder='Confirm password'
                className='input-style-register'
                onChange={update}></input><br></br>

                <div className='spacing-button'/>

                <button className='register-submit'>Create Account</button>
            </form>
        </div>
    </>
  )
}
