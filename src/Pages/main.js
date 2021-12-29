import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { ssovContractCalls } from "../Helpers/APICalls";
import AnalyticFrame from "../Components/AnalyticFrame";


/*
    Main area for chart panels, sep components so its easier to add more ssov data later
    Each analyticFrame calls contract + api data, plan to set an interval to fetch new data
    every 5-10mins? Probably not needed until more ssovs and more users

    Map -> ssovTypes to analytic frames in each row / col
*/

const MainArea = () => {

    const[selector, setSelector] = useState(false);
    const ssovTypes = [
        "dpx",
        "rdpx",
        "eth"
    ]

    return(
        <>
        </>
//     <Container fluid>
// {/* 
//         {
//             ssovTypes.map((type) => 
            
//             <Row id={type} style={{justifyContent:"center"}}>
//                 <h2>{type}</h2>
//                 <AnalyticFrame name={type} />

//             </Row>
//             )
//         } */}
//     </Container>
    )
}

export default MainArea;