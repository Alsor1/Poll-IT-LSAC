//import css
import React, {useState} from 'react';
import "./poll.css";

import Form from 'react-bootstrap/Form';


function Poll({poll}) {

    return(
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
                            <input type="radio" value="singleType" name="pollType"  className="custom-radio"/> {poll.option1}
                        </label>

                        <label className="pollItem">
                            <input type="radio" value="multipelType" name="pollType" className="custom-radio" /> {poll.option2}
                        </label>
                        <label className="pollItem">
                            <input type="radio" value="multipelType" name="pollType" className="custom-radio" /> {poll.option3}
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