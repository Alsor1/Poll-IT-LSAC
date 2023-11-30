import React, {useState} from 'react'
import "./login.css"
import close from '../../assets/X.png'

export default function Login({open, onClose}) {
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
        <h1 className='login-title'>Login</h1>

        <form className='form-style'>
                <input
                type="text"
                name="email"
                id="email-input"
                placeholder='Email'
                className='input-style-login'
                onChange={update}></input><br></br>

                <input
                type="password"
                name="password"
                id="password-input"
                placeholder='Password'
                className='input-style-login'
                onChange={update}></input><br></br>

                <div className='spacing-button'/>

                <button className='login-submit'>Login</button>
            </form>
        </div>
    </>
  )
}
