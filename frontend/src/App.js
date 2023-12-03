import "./App.css";


//Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Importare resurse
import NavbarComponent from "./components/navbar/navbar";
import Home from "./pages/home";
import Poll from "./components/poll/poll"
import Footer from "./components/footer/footer"


//React imports
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="background">
      <div className="lung-site"/>
      <NavbarComponent />
      <Home />
      <Container fluid>
        <Row className="polls">
          <Col><Poll className="poll" xs={6} /></Col>
          <Col><Poll className="poll" xs={6}/></Col>
          <Col><Poll className="poll" xs={6}/></Col>
        </Row>
      </Container>

    <Footer/>
    </div>
  );
}

export default App;
