//import css
import React, {useState} from 'react';
import "./poll.css";

import Form from 'react-bootstrap/Form';


function Poll({poll}) {

    return(
        <div className="background-poll">
            <div className="spacing-poll in-poll">
                <h2>
                {`x`}
                </h2>
                <p>Make a choice:</p>
                <Form className="form-items">
                    {['radio'].map((type) => (
                        <div key={`stacked-${type}`} className="mb-3">
                            
                        <label className="pollItem">
                            <input type="radio" value="singleType" name="pollType"  className="custom-radio"/> Proident dolor nisi nulla id veniam dolore ad do deserunt lorem et sunt sed aute amet pariatur officia sint.
                        </label>

                        <label className="pollItem">
                            <input type="radio" value="multipelType" name="pollType" className="custom-radio" /> 2
                        </label>
                        <label className="pollItem">
                            <input type="radio" value="multipelType" name="pollType" className="custom-radio" /> 3
                        </label>
                        </div>
                    ))}
                </Form>
                

            </div>
        </div>
    );
}

export default Poll;