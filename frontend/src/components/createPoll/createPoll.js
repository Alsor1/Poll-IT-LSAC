import close from '../../assets/X.png';
import './createPoll.css';
import React, { useState } from 'react';
import clearInput from '../../assets/clear-input.png';
import axios from 'axios';

export default function CreatePoll({ open, onClose }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/poll-it/polls', { // Update the URL
        title,
        type,
        option1,
        option2,
        option3,
      });
  
      if (response.status === 201) {
        console.log('Poll created');
      } else {
        console.error('Failed to create poll');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };
  

  const clear1 = document.getElementsByClassName('clear-input-1');
  const clear1Funct = (e) => {
    e.preventDefault();
    clear1.reset();
  };

  if (!open) return null;
  return (
    <>
      <div className="overlay-styles-create-poll" onClick={onClose} />
      <div className="modal-styles-create-poll">
        <form className="form-styles-create-poll">
          {/* buton de inchis */}
          <img onClick={onClose} src={close} alt="close" className="img-close img-styles-create-poll" />

          {/* Titlu */}
          <h2 className="title-style">Create a Poll</h2>

          {/* input de pus nume poll */}
          <label>
            <small className="poll-name-style">Title</small>
          </label>
          <div className="red-line" />
          <input
            type="text"
            name="pollTitle"
            id="pollTitle"
            className="input-style"
            placeholder="Type your question here"
            maxLength={25}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* selectare tip de poll*/}
          <p>Voting type</p>
          <label>
            <input
              label="singleType"
              type="radio"
              value="singleType"
              name="pollType"
              className="poll-type"
              onClick={(e) => {
                console.log(e.target.value);
                setType(e.target.value)
              }}
            />{' '}
            Single Choice
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="multipleType"
              name="pollType"
              className="poll-type"
              onClick={(e) => setType(e.target.value)}
            />{' '}
            Multiple choice
          </label>

          {/* Raspunsuri la poll */}
          <p>Answer Options</p>

          <img
            src={clearInput}
            className="clear-input clear-input-1"
            alt="clearInput"
            onClick={() => (document.getElementById('option1').value = '')}
          />
          <div className="red-line spacing" />
          <input
            type="text"
            id="option1"
            name="option1"
            placeholder="Option 1"
            className="input-style"
            maxLength={60}
            onChange={(e) => setOption1(e.target.value)}
          />
          <br />
          <div className="red-line spacing" />

          <img
            src={clearInput}
            className="clear-input clear-input-2"
            alt="clearInput"
            onClick={() => (document.getElementById('option2').value = '')}
          />
          <input
            type="text"
            id="option2"
            name="option2"
            placeholder="Option 2"
            className="input-style"
            maxLength={60}
            onChange={(e) => setOption2(e.target.value)}
          />
          <br />
          <div className="red-line spacing" />

          <img
            src={clearInput}
            className="clear-input clear-input-3"
            alt="clearInput"
            onClick={() => (document.getElementById('option3').value = '')}
          />
          <input
            type="text"
            id="option3"
            name="option3"
            placeholder="Option 3"
            className="input-style"
            maxLength={60}
            onChange={(e) => setOption3(e.target.value)}
          />
          <br />

          {/* Buton submit poll */}
          <div className="spacing-button" />
          <button className="create-button" onClick={handleCreatePoll}>
            Create Poll
          </button>
        </form>
      </div>
    </>
  );
}
