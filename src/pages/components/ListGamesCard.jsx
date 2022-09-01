import React, { useEffect } from "react";
import { useNavigate }from 'react-router-dom'
import AOS from 'aos'
import '../../css/listGameCard.css'
import formatThousands from "format-thousands";
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL
function ListGamesCard(props){
    const game = props.game
    const navigate = useNavigate()
    const imgpath = PUBLIC_URL + game.game_imgurl
    useEffect(()=>{
        AOS.init();
    },[])
    return (
        <button className="listGamesCardContainer" onClick={()=>navigate(`/game/${game.game_id}`)}>
            <div style={{backgroundImage:`url("${imgpath}")`}} className="listGamesImage">
                
            </div>
            <div className="listGameDescription">
                <div className="listGameTitle">{game.game_name} - {game.category_name}<div className="listGamePrice">{game.game_price<=0?"FREE":`Rp. ${formatThousands(game.game_price,'.')}`}</div></div>
                <p className="listGameText"></p>
                <p className="listGameTextDescription">
                    {game.game_description}
                </p>
            </div>
        </button>
    )
}
export default ListGamesCard;