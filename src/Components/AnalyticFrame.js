import { useEffect, useState } from "react";
import { ResponsivePie } from '@nivo/pie'
import { Container, Row, Col } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { ssovContractCalls } from "../Helpers/APICalls";

/*
    Dynamic analytic frame, no fixed type due to more ssovs / option pools
    getting created, makes it easier to pass in extra props without hard coding files

    props - typeOf (dpx, rdpx, eth, ...) 
                                                $ETH                        $DPX                            $rDPX
                                            Farm APY: 27.4%                 Farm APY: 12%                   Farm APY: 66%
                                            Liquidity left on strikes:  
                                            📍 $4k - sold out               📍 $1.5k - sold out             📍 $44 - sold out
                                            📍 $5k - 3.5mln                 📍 $2k - 2.5mln                 📍 $66 - sold out
                                            📍 $6k - 4.5mln                 📍 $2.5k - 6.5mln               📍 $88 - 1mln
                                            📍 $7k - 8.4mln                 📍 $4k - 30.8mln                📍 $111 - 1.4mln
                                            📍 $8k - 6.2mln                                                📍 $133 - 3.3mln
                                                                             
    - Grab ssov strike prices from ssov contracts via web3
    - Contracts get reset on each epoch, so epoch uint will be 1? Unsure if this plans to change
    - Set an interval for when useEffect is called to grab updated ssov contract data
    - Pie chart for each strike on each ssov

    - chart data -> Id - LiqLeft, label - Liquidity Remaining?, Value - ssov data, color - Blue/purple scheme
*/
const AnalyticFrame = (props) =>  {

    const apiCallType = props.name;

    const[isLoaded, setIsLoaded] = useState(false);

    let data;

    useEffect(() => {

         getAPIData();

    }, []);

    const[pieData, setPieData] = useState({
        strikePrice: [],
        totalLiquidity: [],
        liquidityLeft: [],
        callsPurchased: []
    })

    const[chartData, setChartData] = useState()
    const getAPIData = async () => {
        
        const results = await ssovContractCalls(pieData, props.name);
        setChartData(results)
        setIsLoaded(true);

        data = results["data"]
    }

return (
    <>
    {isLoaded ? 
    
       <>
        {
            Object.values(chartData).map(data => 
               <Col sm={6} style={{height: "350px", width:"600px"}}>
                            <ResponsivePie 
                                data={data}
                                margin={{ top: 40, right: 50, bottom: 80, left: 50 }}
                                innerRadius={0.5}
                                padAngle={0.7}
                                cornerRadius={4}
                                activeOuterRadiusOffset={3}
                                borderWidth={1}
                                arcLinkLabelsThickness={2}
                                arcLinkLabelsColor="white"
                                arcLinkLabelsTextColor="white"
                                colors={{ datum: 'data.color' }}
                                arcLabelsTextColor="white"
                                legends={[
                                    {
                                        anchor: 'bottom',
                                        direction: 'row',
                                        justify: false,
                                        translateX: 0,
                                        translateY: 56,
                                        itemsSpacing: 0,
                                        itemWidth: 100,
                                        itemHeight: 18,
                                        itemTextColor: '#999',
                                        itemDirection: 'left-to-right',
                                        itemOpacity: 1,
                                        symbolSize: 18,
                                        symbolShape: 'circle',
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemTextColor: 'white'
                                                }
                                            }
                                        ]
                                    }
                                ]}      
                            />
               </Col>
            )
        }
        </>
    :
        <Container fluid>
            <Loader
                type="MutatingDots"
                color="#001FFF"
                secondaryColor="#3386FF"
                height={100}
                width={100}
            />
        </Container>
    }
    </>
);

}

export default AnalyticFrame;