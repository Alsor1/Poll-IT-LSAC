//import css
import React, {useState} from 'react';
import "./multiplePoll.css";

import Form from 'react-bootstrap/Form';


function Poll({poll}) {

    return(
        <div className="background-poll">
            <div className="spacing-poll in-poll">
                <h2>
                {poll.title}
                </h2>
                <p>Multiple choice:</p>
                <Form className="form-items">
                    {['checkbox'].map((type) => (
                        <div key={`stacked-${type}`} className="mb-3">
                            
                        <label className="pollItem">
                            <input type="checkbox" value="singleType" name="pollType"  className="custom-checkbox"/> {poll.option1}
                        </label>

                        <label className="pollItem">
                            <input type="checkbox" value="multipelType" name="pollType" className="custom-checkbox" /> {poll.option2}
                        </label>
                        <label className="pollItem">
                            <input type="checkbox" value="multipelType" name="pollType" className="custom-checkbox" /> {poll.option3}
                        </label>
                        </div>
                    ))}
                </Form>
                
                <button className='vote-button'>Vote</button>
            </div>
        </div>
    );
}

export default Poll;