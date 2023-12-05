import "./App.css";
import React, {useState, useEffect} from 'react';

//Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Importare resurse
import NavbarComponent from "./components/navbar/navbar";
import Home from "./pages/home";
import Poll from "./components/poll/poll"
import Footer from "./components/footer/footer"
import MultiplePoll from "./components/multiplePoll/multiplePoll"


//React imports
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'


function App() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get('http://localhost:3001/poll-it/polls');
        console.log('Response:', response);
  
        if (response.status === 200) {
          setPolls(response.data);
        } else {
          console.error('Failed to fetch poll data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching poll data', error);
      }
    };
  
    fetchPolls();
  }, []);


  return (
    <div className="background">
      <div className="lung-site"/>
      <NavbarComponent />
      <Home />
      <Container fluid>
        <Row className="polls">
        {polls.map((poll) => poll.type == "singleType" ? (
        <Col key={poll._id} xs={12} md={4}>
              <Poll poll={poll} />
        </Col>
      ):(
        <Col key={poll._id} xs={12} md={4}>
              <MultiplePoll poll={poll} />
        </Col>
      )
      
      )}
        </Row>
      </Container>

    <Footer/>
    </div>
  );
}

export default App;
