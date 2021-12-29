import Web3 from "web3"
import rdpxABI from '../ContractABI/RdpxSSOV.json'
import dpxABI from '../ContractABI/DpxSSOV.json'
import ethABI from '../ContractABI/EthSSOV.json'

const infura = process.env.REACT_APP_INFURA_KEY;
const web3 = new Web3(`https://arbitrum-mainnet.infura.io/v3/${infura}`)
const divisionInt = 1e18

const contractAddresses = {
    rdpx: '0xfE351e85eb6B4292088Dc28B66E9E92aB62fB663',
    dpx: '0x0359B4dcd2412ff0dafa8B020bcb57aA8Bd13A33',
    eth: '0x3154B747C4bFd35C67607d860b884D28F32Ed00F'
}

/* 
    props -> Array data structure for each ssov

    Method is a factory that calls each appropriate ssov api calls 
    to different async functions for the needed data
*/
export const ssovContractCalls = async (callData, ssovType, testData) => {

    if(ssovType === "dpx") {

        console.log("In if " + ssovType)

        return await ssovCall(callData, contractAddresses.dpx, dpxABI);
    }
    else if(ssovType === "rdpx") {
        console.log("In if " + ssovType)

        return await ssovCall(callData, contractAddresses.rdpx, rdpxABI);

    }
    else {
        console.log("In if " + ssovType)

        return await ssovCall(callData, contractAddresses.eth, ethABI);
    }
}

// Can probably make this more dynamic so all ssovs can go through one function
// Only need to change the contract calling ABI/Address
const ssovCall = async (callData, address, abi) => {

    const contractInstance = new web3.eth.Contract(abi, address);

     return Promise.all([
            contractInstance.methods.getEpochStrikes(1).call(),
            contractInstance.methods.getTotalEpochCallsPurchased(1).call(),
            contractInstance.methods.getTotalEpochStrikeDeposits(1).call()
        ]).then(res => {

            callData.strikePrice = res[0];
            callData.callsPurchased = res[1];
            callData.totalLiquidity = res[2];

            return getLiquidityLeft(callData, callData.strikePrice.length);        
        })
}             

// Grab the liq left for each ssov strike - Also just fix up the integers
// Contracts use uint256 to take up evm stack spot - divide by 1e18 to get nice numbers
// Construct the data structure for the pie charts
const getLiquidityLeft = async (callData, strikePriceLength) => {

    // Work out the liq left from total liq - calls purchased
    for(let i = 0; i < callData.totalLiquidity.length; i++) {
        callData.liquidityLeft[i] = '' + (callData.totalLiquidity[i] - callData.callsPurchased[i]);
    }

    // Change to calls purchased instead of total liq
    let chartData = {
        data: [
            {
                "id": "Liquidity Left",
                "label": "Liquidity Left",
                "value": "",
                "color" : "#2A00FF"
            },
            {
                "id": "Total Liquidity",
                "label": "Total Liquidity",
                "value": "",
                "color" : "#008BFF"
            }
        ]
    }
    let key = "data";

    // Go through the callData to construct the actual object the pie chart needs
    // Only need to go through array index 1/2 for totalLiq and Liqleft
    // Variable i -> Indicates the array of the key in chartData
    // Variable j -> Is the key as we only need liq left and total liq for our structure
    // Variable count -> Used to iterate the key in our structure, data"1", data"2" ...
    // Variable k -> the count for the for loop
    for(let i = 0, j = 1, k = 0, count = 1; k < strikePriceLength * 2; k++) {

        if(j === strikePriceLength - 2) {

            chartData[key][0]["value"] =  Math.round(Object.values(callData)[j][i] / divisionInt)
            
            j = 1;
            i++;

            // Change key to the next ssov strike array
            if(count !== strikePriceLength) {
                key = "data" + count;
                chartData[key] = [
                    {
                        "id": "Liquidity Left",
                        "label": "Liquidity Left",
                        "value": "",
                        "color" : "#2A00FF"
                    },
                    {
                        "id": "Total Liquidity",
                        "label": "Total Liquidity",
                        "value": "",
                        "color" : "#008BFF"
                    }
                ]
            count++
            }
        }
        else { 
            chartData[key][1]["value"] =  Math.round(Object.values(callData)[j][i] / divisionInt);
            j++
        }
    }  
    return chartData;
}
