import { useState , useEffect} from "react"
const host = process.env.hasOwnProperty('DEPLOY_URL') ? process.env.DEPLOY_URL : 'http://localhost:8888/';

const Card = ({movie}) => {
    const [moviesData,setMoviesData] = useState('');
    const [isShown,setIsShown] = useState(false);

    console.log('inside card', movie)
    const fetchData = async () => {
      const moviesResponse = await fetch(`/.netlify/functions/getMoviesData?movie=${movie}`,{
          method: "GET"
      })
      const moviesResponseBody = await moviesResponse.json()
      console.log("inside card after call: ",JSON.stringify(moviesResponseBody))
      setMoviesData(moviesResponseBody)
    }
   
 
    useEffect(()=>{
      fetchData();
    },[movie]) // eslint-disable-line react-hooks/exhaustive-deps
    console.log("isShown "+ isShown);
    return (
        <>  
        <div className="boxart-container inline-block" onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>

           { !isShown && (<video  controls className="boxart-img" src={moviesData.thumbnail} type="video/mp4"/>)}
           { isShown && (
             <>
             <div class="modal-container">
               <video  controls autoPlay={true} loop className="boxart-img" src={moviesData.thumbnail} type="video/mp4"/>
                <div class="modal-info-container">
                    <div class="button-controls-container">
                        <button class="primary-button"><span class="play-button has-icon"></span></button>
                        <button class="secondary-button"><span class="tick-button has-icon"></span></button>
                        <button class="secondary-button"><span class="like-button has-icon"></span></button>
                        <button class="secondary-button"><span class="unlike-button has-icon"></span></button>
                    </div>
                    <div class="video-meta-data-container">
                        <span class="match-score">{moviesData.match_score}% Match</span>
                        <span class="maturity-rating">{moviesData.ageLimit}+</span>
                        <span class="duration">{moviesData.duration}</span>
                    </div>
                </div>
            </div>
            </>
           )}
       </div>
       </>
    )
}

export default Card;