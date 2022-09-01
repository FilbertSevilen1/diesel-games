import React, { useState } from "react";
import Axios from 'axios'
import formatThousands from 'format-thousands'
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/toast";
const API_URL = process.env.REACT_APP_API_URL
function TopUpCard(props){
    const user = useSelector((state)=>state.user)
    const price = props.price
    const dispatch = useDispatch();
    const [confirmation, setConfirmation] = useState(false);
    const toast = useToast();
    const topUp = () =>{
        const data = {
            id : user.id,
            topUpValue : price
        }
        Axios.post(API_URL  + "/user/topup", data)
        .then((respond)=>{
            console.log(respond.data)
            dispatch({type:"ADD_WALLET", payload:{newBalance : respond.data[0]}})
            toast({
                title: 'Top Up Success',
                description: "Thank you for Top Up in Diesel Games!",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            setConfirmation(false)
        })
        .catch((error)=>{
            console.log(error.response.data)
            toast({
                title: 'Top Up Error',
                description: "Internal Service Error",
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
            setConfirmation(false)
        })
    }
    const toggleConfirmation = () =>{
        setConfirmation(true)
    }
    const hideConfirmation = () =>{
        setConfirmation(false)
    }
    return (
        <div className="fullSize">
            {
                confirmation?
                <div className="topUpConfirmationContainer" onClick={hideConfirmation}>
                    <div className="topUpConfirmationForm w3-animate-opacity">
                        <div className="topUpConfirmationFormHeader">
                            <div className="topUpConfirmationFormHeaderTitle">
                                Top Up Confirmation
                            </div>
                            <button className="topUpConfirmationFormHeaderClose" onClick={hideConfirmation}>
                                X
                            </button>
                        </div>
                        <div className="topUpConfirmationBody">
                            <p className="topUpConfirmationBodyText">Are you sure purchase wallet for Rp. {formatThousands(price,".")}?</p>
                            <div className="topUpConfirmationButtonGroup">
                                <button className="topUpButton success" onClick={topUp}>
                                    Yes
                                </button>
                                <button className="topUpButton error" onClick={hideConfirmation}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div> 
                </div>
            }
            <button className="TopUpContentBox" onClick={toggleConfirmation}>
                <button className="TopUpContentBoxPrice">Rp. {formatThousands(price,".")}</button>
            </button>
        </div>
        
    )
}
export default TopUpCard