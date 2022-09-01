import React, { useEffect } from 'react'
import AOS from 'aos'
import "../../css/topup.css"
import TopUpCard from '../components/TopUpCard'

import visa from "../../img/payment/visa.png"
import mastercard from "../../img/payment/mastercard.png"
import dragoncoin from "../../img/payment/dragon.png"
import gp from "../../img/payment/cf.png"
import { useSelector } from 'react-redux'

function TopUp(){
    const user = useSelector((state)=>state.user)

    const price = [45000, 90000, 135000, 225000, 450000, 900000]
    useEffect(()=>{
        if(user){
            
        }
        AOS.init();
    })
    return (
        <div className='TopUpContainer'>
            <div className='TopUpContainerMain w3-animate-opacity' data-aos="fade-right">
                <div className='topUpContainerLeft'>
                    <div className='TopUpContentGroup'>
                        <TopUpCard price = {price[0]}/>
                        <TopUpCard price = {price[1]}/>
                        <TopUpCard price = {price[2]}/>
                    </div>
                    <div className='TopUpContentGroup'>
                        <TopUpCard price = {price[3]}/>
                        <TopUpCard price = {price[4]}/>
                        <TopUpCard price = {price[5]}/>
                    </div>
                </div>
                <div className='TopUpContainerRight w3-animate-opacity' data-aos="fade-left">
                    <div className='TopUpRuleTitle'>
                        Top Up Rules
                    </div>
                    <div className='TopUpRuleList'>
                        <li>Top Up cannot be refunded except by situational circumstances</li>
                        <li>Wallet will be given after user finish their payment</li>
                        <li>Accept all payment below:</li>
                        <div className='TopUpRuleImageGroup'>
                            <div className='TopUpRuleImage'>
                                <img src={visa} className="fullSize"></img>
                            </div>
                            <div className='TopUpRuleImage'>
                                <img src={mastercard} className="fullSize"></img>
                            </div>
                            <div className='TopUpRuleImage'>
                                <img src={dragoncoin} className="fullSize"></img>
                            </div>
                            <div className='TopUpRuleImage'>
                                <img src={gp} className="fullSize"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default TopUp;