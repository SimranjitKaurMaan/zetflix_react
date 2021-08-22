import { useState, useEffect } from "react";
const host = process.env.hasOwnProperty('URL') ? process.env.URL : 'http://localhost:8888/';

const HeroSection = () =>{
    const [heroData, setHeroData] = useState('');

    const fetchData = async () => {
        console.log("inside hero section")
        const moviesResponse = await fetch(`${host}.netlify/functions/getMoviesData?movie=Finding Nemo`,{
            method: "GET"
        })
        const movieResponseBody = await moviesResponse.json()
        console.log("inside herosection after call: ",JSON.stringify(movieResponseBody))
        setHeroData(movieResponseBody);
      }  

    useEffect(()=>{
        fetchData();
      },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (    
    <>
    <div className="hero-image-container">
        <video muted controls autoPlay={true} loop className="hero-image" src={heroData.thumbnail} type="video/mp4"/>
        <div className="metainfo-layer">
            <div className="logo-and-text">
                <div className="logo">{heroData.title}</div>
                <div className="synopsis">{heroData.synopsis}
                </div>
            </div>
            <div className="button-controls-container">
                <a className="play-link" href="/"><span className="play-button has-icon" style={{marginRight: "0.5rem"}} ></span>Play</a>
                <a className="info-link" href="/"><span className="moreinfo-button has-icon" style={{marginRight: "0.5rem"}} ></span>More Info</a>
            </div>
        </div>
    </div>
    </>
  );
}

export default HeroSection;