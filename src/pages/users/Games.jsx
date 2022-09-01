import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../../css/games.css'
import ListGamesCard from '../components/ListGamesCard';
function Games(){
    const gameList = useSelector((state)=>state.gameList)
    console.log(gameList)
    const dispatch = useDispatch()

    const generateGameCard = () =>{
        if(gameList){
            return gameList.map((game, index)=>{
                return <ListGamesCard
                    key = {game.id}
                    game = {game}
                />
            })
        }
    }
    return(
        <div className='gamesContainer'>
            <div className='gamesContainerBackground'>
                <div className='gamesListContainer'>
                    {generateGameCard()}
                </div>
            </div>
        </div>
        
    )
}
export default Games;
