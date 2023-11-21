import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import testoasa from "../assets/testoasa.png"

//Import css
import './home.css'


export default function Home() {
    return (
        <div className="empty-space">
            <Container>
                <Row className="text-allign">
                    <Col md={6} xs={5}>
                        <h1 className="text-home text-lg text-md text-sm">
                        Opiniile sunt mai importante ca niciodată. Platformele de sondaje permit organizatorilor să culeagă feedback direct de la audiența lor și să înțeleagă mai bine nevoile și dorințele acesteia.
                        </h1>
                    </Col>
                    <Col md={6} xs={7}>
                        <img src={testoasa} alt="Testoasa" className="img-fluid" />
                    </Col>
                </Row>
            </Container>
        </div>
    );

}