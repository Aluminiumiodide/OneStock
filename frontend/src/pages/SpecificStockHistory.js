
import "../css/SearchBar.css"
import NavBar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
function SpecificStockHistory() {
    const [orders, setOrders] = useState(null);
    const [entrydividend, setDividend] = useState(null);
    const [specificStockHistory, setStockHistory] = useState(null);
    const [a, seta] = useState([]);
    const [ticker, setTicker] = useState(null);
    let tickerorders = null;

    useEffect(() => {
        axiosInstance
            .get('StockOrdersGetPost/')
            .then(response => {
                setOrders(response.data);
            })
            .catch((err) => {
                console.log(err)
                alert("permission denied");
            }
            );
       
    }, []);




    const handleSubmit = (e) => {

        axiosInstance
            .get('SpecificStockOrderHistoryPutPatchDeleteByTicker/' + ticker + '/')
            .then(response => {
                setStockHistory(response.data);
            })
            .catch((err) => {
                console.log(err)
                alert("permission denied");
            }


            );

        
            
            let k =0;
            {orders&&
                orders.map((b) => (
                tickerorders[k] = b
                
                ))
                k++;
            }
            seta(tickerorders)
            // for (var i = 0; i < orders.length; i++) {
            //     if (orders[i].ticker == "abc") {
            //         tickerorders[0] = orders[i];
            //         k++;
            //         seta(
            //             a.map(item => 
            //                 item.id === index 
            //                 ? {...item, someProp : "changed"} 
            //                 : item 
            //         ))
                    
            //     }
            // }
            

    }


    return (
        <>


            <NavBar />
            <group id="specific">
            <h2>Specific Stock Information</h2>
            <form class="form-wrapper" onSubmit={handleSubmit}>
                
                    
                <input type="text" placeholder="Enter Specific Ticker e.g TSLA.." onChange={(e) => setTicker(e.target.value)}></input>
                <input type="submit" name="submit" value="Search" /> 
                
                
            </form>
            <p2> Specific Stock Performance: </p2>
            <net_back>%3.9</net_back>
            <p3>Stock Net Value:</p3>
            <over_back>$1,221.02</over_back>
            
            <table val = "3">
                <caption>Shares Information</caption>
                <tr>
                    <th scope="col">Ticker</th>
                    <th>Average Purchase Price($)</th>
                    <th>Current Price($)</th>
                    <th>Shares Owned</th>
                    <th>Account</th>
                </tr>
            </table>
            <table val = "4">
                <caption>Order History</caption>
                <tr>
                    <th scope="col">Buy/Sell</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Purchase/Sell Price($)</th>
                    <th>Date</th>
                    <th>Account</th>
                </tr>
            </table>
           


            </group>


        </>
    );
}

export default SpecificStockHistory;