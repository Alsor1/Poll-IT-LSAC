// Import necessary libraries and assets
import React, { useState } from 'react';
import "./poll.css";
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Poll({ poll }) {
    const storedUser = localStorage.getItem('user');
    const [selectedOption, setSelectedOption] = useState(null);
    const [checked, setChecked] = useState(null);
    const user = JSON.parse(storedUser);
    console.log(user.userId);
    let logedin=true;

  let renderDeleteButton = false;

  const handleVote = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/poll-it/polls/vote',
        {
          pollId: poll._id,
          userId: user.userId,
          selectedOption: checked,
        }
      );
  
      if (response.status === 200) {
        console.log('Vote submitted successfully');
        window.location.reload()
      } else {
        console.error('Failed to submit vote');
      }
    } catch (error) {
      console.error('Error submitting vote', error);
    }
  };
  if (storedUser) {
    const user = JSON.parse(storedUser);
    const userCreator = user.userId;

    // Check if the userCreator is the same as the userCreator from the poll
    renderDeleteButton = userCreator === poll.userCreator;
  } else {
    console.log("Failed to fetch user");
    logedin=false;
  }


  const handleDeletePoll = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/poll-it/polls/${poll._id}`, {
        headers: {
          'user-id': poll.userCreator,
        },
      });

      if (response.status === 200) {
        console.log('Poll deleted');
        window.location.reload();
        // Add logic to handle UI update after successful deletion if needed
      } else {
        console.error('Failed to delete poll');
        // Add logic to handle UI update after deletion failure if needed
      }
    } catch (error) {
      console.error('Error deleting poll', error);
    }
  };

  return (
    <div className="background-poll">
      <div className="spacing-poll in-poll">
        <h2>
          {poll.title}
        </h2>
        <p>Make a choice:</p>
        <Form className="form-items">
          {['radio'].map((type) => (
            <div key={`stacked-${type}`} className="mb-3">
              <label className="pollItem">
                <input
                  type="radio"
                  value={poll.option1}
                  name="pollType"
                  className="custom-radio"
                  onChange={() => {
                    setSelectedOption(poll.option1);
                    setChecked(0);
                  }}
                /> {poll.option1}
              </label>
              <label className="pollItem">
                <input
                  type="radio"
                  value={poll.option2}
                  name="pollType"
                  className="custom-radio"
                  onChange={() => {
                    setSelectedOption(poll.option2);
                    setChecked(1);
                  }}
                /> {poll.option2}
              </label>
              <label className="pollItem">
                <input
                  type="radio"
                  value={poll.option3}
                  name="pollType"
                  className="custom-radio"
                  onChange={() => {
                    setSelectedOption(poll.option3);
                    setChecked(2);
                  }}
                /> {poll.option3}
              </label>
            </div>
          ))}
        </Form>
        {logedin && poll.voted.includes(user.userId)?'':(<button className='vote-button' onClick={handleVote}>
          Vote
        </button>)}
        {/* Render delete button only if userCreator matches */}
        {renderDeleteButton && (
          <button className='del-button' onClick={handleDeletePoll}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Poll;
