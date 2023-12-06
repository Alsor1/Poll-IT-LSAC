// Import necessary libraries and assets
import React, { useState } from 'react';
import "./multiplePoll.css";
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Poll({ poll }) {
  const storedUser = localStorage.getItem('user');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [checked, setChecked] = useState([]);


  // Parse user from storedUser, or set it to an empty object if not available
  const user = JSON.parse(storedUser) || {};

  let renderDeleteButton = false; // Variable to determine whether to render the delete button
  let a=0, b=0, c=0;
  const handleVote = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/poll-it/polls/vote-multiple',
        {
          pollId: poll._id,
          userId: user.userId,
          selectedOptions: checked,
        }
      );

      if (response.status === 200) {
        console.log('Vote submitted successfully');
        window.location.reload();
        // Add logic to handle UI update after successful vote if needed
      } else {
        console.error('Failed to submit vote');
        // Add logic to handle UI update after vote failure if needed
      }
    } catch (error) {
      console.error('Error submitting vote', error);
    }
  };

  if (storedUser) {
    const userCreator = user.userId;

    // Check if the userCreator is the same as the userCreator from the poll
    renderDeleteButton = userCreator === poll.userCreator;
  } else {
    console.log("No user stored in localStorage");
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
        <h2>{poll.title}</h2>
        <p>Multiple choice:</p>
        <Form className="form-items">
          {['checkbox'].map((type) => (
            <div key={`stacked-${type}`} className="mb-3">
              <label className="pollItem">
                <input
                  type="checkbox"
                  value={poll.option1}
                  name="pollType"
                  className="custom-checkbox"
                  onChange={() => {
                    const updatedOptions = toggleOption(poll.option1, selectedOptions);
                    setSelectedOptions(updatedOptions);
                    if(a===0) {
                      a=1;
                      console.log("a is:",a);
                    }else if(a===1){ 
                      a=0;
                      console.log("a is:",a);
                    }
                    setChecked([a,b,c]);
                  }}
                /> {poll.option1}
              </label>
              <label className="pollItem">
                <input
                  type="checkbox"
                  value={poll.option2}
                  name="pollType"
                  className="custom-checkbox"
                  onChange={() => {
                    const updatedOptions = toggleOption(poll.option2, selectedOptions);
                    setSelectedOptions(updatedOptions);
                    
                  }}
                  onClick={() => {
                    if(b===0) {
                      b=1;
                      console.log("b is:",b);
                    }else if(b===1){ 
                      b=0;
                      console.log("b is:",b);
                    }
                    setChecked([a,b,c]);
                  }}
                /> {poll.option2}
              </label>
              <label className="pollItem">
                <input
                  type="checkbox"
                  value={poll.option3}
                  name="pollType"
                  className="custom-checkbox"
                  onChange={() => {
                    const updatedOptions = toggleOption(poll.option3, selectedOptions);
                    setSelectedOptions(updatedOptions);
                    if(c===0) {
                      c=1;
                      console.log("c is:",c);
                    }else if(c===1){ 
                      c=0;
                      console.log("c is:",c);
                    }
                    setChecked([a,b,c]);
                  }}
                /> {poll.option3}
              </label>
            </div>
          ))}
        </Form>
        {poll.voted.includes(user.userId) ? '' : (
          <button className='vote-button' onClick={handleVote}>
            Vote
          </button>
        )}
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

// Helper function to toggle options in the selectedOptions array
const toggleOption = (option, selectedOptions) => {
  const index = selectedOptions.indexOf(option);
  if (index === -1) {
    return [...selectedOptions, option];
  } else {
    return selectedOptions.filter((item) => item !== option);
  }
};

export default Poll;
