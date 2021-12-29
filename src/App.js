import React from 'react';
import data from "./data.js"
import Header from "./Components/Header"
import MainArea from "./Pages/main"
import SideBar from './Components/SideBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from "react-bootstrap";
import './App.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function App() {
  return (

    <>
    
      <Header />

     
    <Container fluid>
      <SideBar />
      <MainArea />
    </Container>

      
    </>
      
  );
}

export default App;
