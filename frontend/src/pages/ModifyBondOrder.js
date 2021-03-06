import React, {useEffect, Component } from 'react';
import { useState } from "react"
import NavBar from '../components/Navbar';
import "../css/CreateOrder.css"
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
const ModifyBondOrder = () => {

    const [orderID, setOrderID] = useState(null);
    const [valuation, setValuation] = useState(null);
    const [faceValue, setFaceValue] = useState(null);
    const [maturityDate, setMaturityDate] = useState(null);
    const [interest, setInterest] = useState(null);
    const [bonds, setBonds] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
       
        axiosInstance
        .get('BondsGetPost/')
            .then(response => {
                setBonds(response.data)
            })
            .catch((err) => {
                console.log(err)
                alert("permission denied");
            }
            

            );
        
      
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault()
        const OrderInfo = {
            orderID,
            valuation,
            faceValue,
            maturityDate,
            interest
        }
        axiosInstance
        .patch('BondsGetPutPatchDelete/'+OrderInfo.orderID+'/', {
            valuation: OrderInfo.valuation,
            principal: OrderInfo.faceValue,
            maturityDate: OrderInfo.maturityDate,
            interest: OrderInfo.interest,
    
        })
        .catch((err) => {
            alert("No existing asset, please create the asset first");
        }
        );
        navigate('/OtherAssetHistory');

    }

    return (

        <div className="content">
            <NavBar />
            <div className="CreateOrder">
                <h2>Modify Bond Order</h2>
                <form onSubmit={handleSubmit}>
                    <label>OrderID: </label>
                    <select 
                        required
                        value={orderID}
                        onChange={(e) => setOrderID(e.target.value)} >
                        {bonds&&
                            bonds.map((bond) => (
                                <option value={bond.id}>{bond.id}</option>    
                        ))
                        }
                        {!bonds ?(
                            <option value="null">No existsing Bonds, Please Add Bonds First</option>  
                            ):
                            (<option value="null">Please Select an Bond</option>
                            )
                        }
                    </select>
                    <label>Modify Valuation: </label>
                    <input type="number"
                        required
                        value={valuation}
                        onChange={(e) => setValuation(e.target.value)} />

                    <label>Modify Face Value: </label>
                    <input type="number"
                        required
                        value={faceValue}
                        onChange={(e) => setFaceValue(e.target.value)} />

                    <label>Modify Maturity Date: </label>
                    <input type="date"
                        required
                        value={maturityDate}
                        onChange={(e) => setMaturityDate(e.target.value)} />

                    <label>Modify Interest: </label>
                    <input type="number"
                        required
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)} />



                    <button>Modify Bond Order</button>
                </form>

            </div>

        </div>


    );
}

export default ModifyBondOrder;