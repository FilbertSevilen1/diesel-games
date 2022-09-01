import React, { useEffect } from "react";
import { useNavigate }from 'react-router-dom'
import AOS from 'aos'
import '../../css/newGameCard.css'
import formatThousands from "format-thousands";
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL
function NewGamesCard(props){
    const game = props.game
    const navigate = useNavigate()
    const imgpath = PUBLIC_URL + game.game_imgurl
    useEffect(()=>{
        AOS.init();
    },[])
    return (
        <div className="newGameCardContainer" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="0">
            <button className="newGameCard" onClick={()=>navigate(`/game/${game.game_id}`)}>
                <div style={{backgroundImage:`url("${imgpath}")`}} className="newGameImage">
                    <div className="newGameImagePrice">
                        {game.game_price<=0?<p>FREE</p>:<p>Rp. {formatThousands(game.game_price,'.')}</p>}
                    </div>
                    
                </div>
                
            </button>
            <div className="newGameName">
                {game.game_name}
            </div>
        </div>
    )
}
export default NewGamesCard;