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

  const createDefaultPolls = async () => {
    try {

      const existingPolls = await axios.get('http://localhost:3001/poll-it/polls');

      if (existingPolls.data.length === 0) {
        const defaultPolls = [
          {
            title: 'Ce animal se afla pe tricourile departamentului de IT?',
            option1: 'Un elefant',
            option2: 'Testos',
            option3: 'Cane',
          },
          {
            title: 'Departament preferat',
            option1: 'Logistica',
            option2: 'HR',
            option3: 'FR',
          },
        ];
  
        for (const poll of defaultPolls) {
          await axios.post('http://localhost:3001/poll-it/polls', poll, {
            headers: {
              'user-id': 'defaultUser',
            },
          });
          console.log(`Default poll "${poll.title}" created successfully`);
        }
      } else {
        console.log('Database is not empty. Skipping default poll creation.');
      }
    } catch (error) {
      console.error('Error checking/fetching existing polls', error);
    }
  };
  

  useEffect(() => {
    createDefaultPolls();
  }, []);

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
