import close from '../../assets/X.png'
import './createPoll.css'
import React, {useState} from 'react'
import Poll from '../poll/poll'
// Am scris asa CSS-ul pentru ca nu stiam de ce nu mergea sa il scriu in fisierul de CSS
// Dupa ce m-am uitat mai atent am realizat ca am uitat sa pun extensia de .css la finalul fisierului (plang)
const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left:'50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#04395E',
  paddingLeft: '50px',
  paddingRight: '50px',
  paddingTop:'20px',
  paddingBottom:'20px',
  zIndex:1000,
  borderRadius:"25px",
  color:"#FFF"
  
}

const OVERLAY_STYLES = {
  position:'fixed',
  top:0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#D9D9D9' ,
  opacity:"79%",
  zIndex: 1000
}

const IMG_STYLES = {
  display:"inline",
  float:"right",
  
}

const FORM_STYLES = {
  display:"block",
}
let poll={};

export default function CreatePoll({open, onClose}) {
  const[state, setState] = useState({});
  const update = event =>{
    const target = event.currentTarget

    setState({
      ...state,
      [target.name] : target.type === 'text' ? target.value : null
    })
  }

  // const submit = event =>{
  //   event.preventDefault();
  //   poll = state;
  //   console.log(poll);
  //   Poll poll={poll};
  // }
  
  if(!open) return null
  return (
    <>
    <div style={OVERLAY_STYLES} onClick={onClose}/>
      <div style={MODAL_STYLES}>

        <form style={FORM_STYLES}>
          {/* buton de inchis */}
          <img
            onClick={onClose}
            src={close}
            alt="close"
            className='img-close'
            style={IMG_STYLES}></img>

          {/* Titlu */}
          <h2 className="title-style">Create a Poll</h2>

          {/* input de pus nume poll */}
          <label><small className='poll-name-style'>Title</small></label>
          <div className="red-line"></div>
          <input
            type="text"
            name='pollTitle'
            id='pollTitle'
            className='input-style'
            placeholder='Type your question here'
            onChange={update}></input>

          {/* selectare tip de poll*/}
          <p>Voting type</p>
          <label>
          <input
            type="radio"
            value="singleType"
            name="pollType"
            className="poll-type" 
            onClick={() => <Poll poll={poll} />}/> Single Choice 
          </label><br></br>

          <label>
          <input
            type="radio"
            value="multipelType"
            name="pollType"
            className="poll-type" /> Multiple choice
          </label>

          {/* Raspunsuri la poll */}
          <p>Answer Options</p>
          <div className="red-line spacing"></div>
          <input
            type="text"
            id='option1'
            name='option1'
            placeholder='Option 1'
            onChange={update}
            className='input-style'></input><br></br>
          <div className="red-line spacing"></div>
          <input
            type="text"
            id='option2'
            name='option2'
            placeholder='Option 2'
            onChange={update}
            className='input-style'></input><br></br>
          <div className="red-line spacing"></div>
          <input
            type="text"
            id='option3'
            name='option3'
            placeholder='Option 3'
            onChange={update}
            className='input-style'></input><br></br>

          {/* Buton submit poll */}
          <div className='spacing-button' />
          <button className=" create-button"  href="#">Create Poll</button>
        </form>
      </div>
    </>
  )
}
