//import React, { Component } from 'react';
import NavBar from '../components/Navbar';
import "../css/StockOrderHistory.css"
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
const StockOrderHistory = () => {

    const [entrys, setentrys] = useState(null);
    const [orderForm, setOrderForms] = useState(null);





    useEffect(() => {
        axiosInstance
            .get('StockOrdersGetPost/')
            .then(response => {
                setentrys(response.data)
            })
            .catch((err) => {
                alert("NOT LOGGED IN");
            }


            );

    }, []);



    return (
        <div className="content">
            <NavBar />
            <h2>Stock Order History</h2>

            <div className="StockOrderHistory">
                <div className="buttonsContainer">

                    <ButtonGroup
                        style={{
                            fontSize:12,
                            
                        }}
                        
                        variant = "contained" 
                        color = "primary">
                        <Button>Import From PC</Button>
                        <Button
                            href="/CreateOrder"
                        >Create Custom Order
                        </Button>

                        <Button href="/ModifyOrder" >Modify Order</Button>
                        <Button href="/DeleteOrder" >Delete Order</Button>
                       
                        <Button href="/AddBrokerage" >Add Brokerage</Button>
                        <Button href="/AddAccount" >Add Account</Button>
                        
                    </ButtonGroup>

                </div>



                <table val="11">
                    <caption>Order History</caption>

                    <tr>
                        <th>Order ID</th>
                        <th>Ticker</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Value</th>
                        <th>Buy/Sell</th>
                        <th>OrderReqID</th>
                    </tr>
                    {entrys &&
                        entrys.map((entry) => (
                            <tr>
                                <th>{entry.id}</th>
                                <th>{entry.ticker}</th>
                                <th>{entry.purchasePrice}</th>
                                <th>{entry.quantity}</th>
                                <th>{entry.purchaseTime}</th>
                                <th>{entry.purchasePrice * entry.quantity}</th>
                                <th>{entry.buysell}</th>
                                <th>{entry.orderReqID}</th>

                            </tr>
                        ))
                    }

                </table>
            </div>
        </div>
    );
}

export default StockOrderHistory;