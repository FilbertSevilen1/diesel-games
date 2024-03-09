import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import Axios from 'axios'
import '../../css/home.css'
import NewGamesCard from '../components/NewGamesCard'
import formatThousands from 'format-thousands'
const API_URL = process.env.REACT_APP_API_URL
const IMG_URL = process.env.REACT_APP_PUBLIC_URL
function Home(){
    const [bannerState, setBannerState] = useState(0)
    const [bannerAnimation, setBannerAnimation] = useState(false)
    const [featuredGameList, setFeaturedGameList] = useState("")
    const [newGamesList, setNewGamesList] = useState("");
    
    useEffect(() => {
        Axios.get(API_URL + "/games?_limit=3")
        .then((respond)=>{
            setFeaturedGameList(respond.data)
            AOS.init();
        })
        .catch((error)=>{
            console.log(error.message.data)
        })
        Axios.get(API_URL + "/games?_releaseDate=DESC&&_limit=4")
        .then((respond)=>{
            setNewGamesList(respond.data)
        })
        .catch((error)=>{
            console.log(error.message.data)
        })
      }, []);

    const nextBanner = () =>{
        setBannerAnimation(true);
        if(bannerState==featuredGameList.length-1){
            setBannerState(0);
        }
        else setBannerState(bannerState+1);
        setTimeout(()=>setBannerAnimation(false),0);
    }
    const prevBanner = () =>{
        setBannerAnimation(true);
        if(bannerState==0){
            setBannerState(featuredGameList.length-1);
        }
        else setBannerState(bannerState-1);
        setTimeout(()=>setBannerAnimation(false),0);
    }
    const nextButton = () =>{
        nextBanner();
    }
    const prevButton = () =>{
        prevBanner();
    }
    const generateGameGroup = () =>{
        console.log(newGamesList)
        // if(newGamesList){
        //     return newGamesList.map((game, index)=>{
        //         return <NewGamesCard
        //             key = {game.id}
        //             game = {game}
        //         />
        //     })
        // }
    }
    return (
        <div className='homeContainer'>
            {
                featuredGameList?
                <div className='homeBanner'>
                    <button className='fullScreenNavbarContainer'>
                        <div className='homeBannerSlide'>
                            <img style={{display:bannerAnimation?'none':'block'}} src = {IMG_URL + featuredGameList[bannerState].game_imgurl} className='w3-animate-opacity fullSize homeBannerImage'/>
                        </div>
                        <div className='homeBannerGameDescription'>
                            <p className='homeBannerGameTitle'>
                                {featuredGameList[bannerState].game_name}
                            </p>
                            <div className='homeBannerGamePrice'>
                                {featuredGameList[bannerState].game_price<=0?<p>FREE</p>:<p>Rp. {formatThousands(featuredGameList[bannerState].game_price,'.')}</p>}
                            </div>
                        </div>
                    </button>
                    <button className='homeBannerButton homeBannerButtonLeft' onClick={prevButton}>{"<"}</button>
                    <button className='homeBannerButton homeBannerButtonRight' onClick={nextButton}>{">"}</button>
                    
                    <div className='homeBannerStateIndicator'>
                        
                    </div>
                </div>
                :
                <div>
                </div>
            }
            <div className='fullScreenContainer'>
                <div className='homeNewGameSection'>
                    <p className='homeNewGameTitle' data-aos="fade-down" data-aos-anchor-placement="top-bottom">
                        New Games
                    </p>
                    <div className='homeNewGameGroup'>
                        {generateGameGroup()}
                    </div>
                </div>
                
            </div>

        </div>
    )
}
export default Home;