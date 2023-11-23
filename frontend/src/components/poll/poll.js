//import css
import "./poll.css";

import Form from 'react-bootstrap/Form';


let num=0;
function Poll() {
    return(
        <div className="background-poll">
            <div className="spacing-poll in-poll">
                <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h2>
                <p>Make a choice:</p>
                <Form className="form-items">
                    {['radio'].map((type) => (
                        <div key={`stacked-${type}`} className="mb-3">
                            <Form.Check
                                className="spacing-items-poll"
                                label={`${num}`}
                                name= {`group${num}`}
                                type={type}
                                id={`stacked-${type}-1`}
                            />
                            <Form.Check
                                className="spacing-items-poll"
                                label="2"
                                name= {`group${num}`}
                                type={type}
                                id={`stacked-${type}-2`}
                            />
                            <Form.Check
                                className="spacing-items-poll"
                                label="3"
                                name= {`group${num}`}
                                type={type}
                                id={`stacked-${type}-3`}
                            />
                        </div>
                    ))}
                </Form>
                

            </div>
        </div>
    );
}

export default Poll;