import { Row, Col, Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import logo from "../Images/DopexLogo.svg"

const Header = (props) => {

    return (
        <>


<Navbar bg="black" variant="dark">
    <Container fluid>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          width="80"
          height="80"
          className="d-inline-block align-top"
         style={{marginLeft:"2rem"}}/>{' '}
        <p style={{fontWeight: "bold", color: "white", marginLeft:"2rem",display:"inline", fontSize:"40px"}}>Dopex Analytics</p>
      </Navbar.Brand>
      <Nav className="me-auto" style={{marginLeft:"2rem"}}>
        <Nav.Link>Home</Nav.Link>
        <Nav.Link>Offical Website</Nav.Link>
        <Nav.Link>Charts</Nav.Link>
      </Nav>
      
    </Container>
  </Navbar>
  <Navbar bg="black" variant="dark">
    <Container style={{justifyContent:"center"}}>
        <Nav style={{color:"white"}}>
            <Row >
                <Col md="auto">
                <Nav.Item>
                    <span>Eth </span>
                    <span>$9999</span>
                </Nav.Item>

                </Col>
                <Col md="auto">
                <Nav.Item>
                    <span>Dpx </span>
                    <span>$9999</span>
                </Nav.Item>
                </Col>

                <Col md="auto">
                <Nav.Item>
                    <span>Rdpx </span>
                    <span>$99</span>
                </Nav.Item>
                </Col>
            
            

            </Row>
            
        </Nav>
    </Container>
  </Navbar>
  
</>
        

    )
}

export default Header;


{/* <Navbar sticky="top" expand="lg">
<Row style={{height:"10%"}}>  
    <Nav>
        <Col sm={4} style={{padding:"5% 10%"}}>
            <img src={logo} style={{height:"50%"}}/>
        </Col>
        <Col sm={true} style={{fontWeight: "bold", marginLeft: "0px", color: "white", marginTop:"10%", fontSize:"25px"}}>
            <p>Dopex SSOV Analytics</p>
        </Col>
    </Nav>
</Row>

<Row>

<Col md="auto" style={{marginTop: "-1.5rem", padding:"0 15%", color:"white"}}>
        dpx price
    
    </Col>
    <Col md="auto" style={{marginTop: "-1.5rem", padding:"0 15%", color:"white"}}>
        rdpx price
    
    </Col>

    <Col md="auto" style={{marginTop: "-1.5rem", padding:"0 15%",color:"white"}}>
    
    Eth price
    
    </Col>
</Row>

</Navbar> */}