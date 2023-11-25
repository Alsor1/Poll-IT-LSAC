import "./App.css";


//Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Importare resurse
import NavbarComponent from "./components/navbar/navbar";
import Home from "./pages/home";
import Poll from "./components/poll/poll"


//React imports
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="background">
      <NavbarComponent />
      <Home />
      <Container fluid>
        <Row className="polls">
          <Col><Poll/></Col>
          <Col><Poll/></Col>
          <Col><Poll/></Col>
        </Row>
      </Container>


    </div>
  );
}

export default App;
