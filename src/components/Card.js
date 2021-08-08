import { useState , useEffect} from "react"

const Card = ({movie}) => {
    const [moviesData,setMoviesData] = useState('');
    console.log('inside card', movie)
    const fetchData = async () => {
      const moviesResponse = await fetch(`.netlify/functions/getMoviesData?movie=${movie}`,{
          method: "GET"
      })
      const moviesResponseBody = await moviesResponse.json()
      console.log("responseBody: ",JSON.stringify(moviesResponseBody))
      setMoviesData(moviesResponseBody)
    }
   
 
    useEffect(()=>{
      fetchData();
    },[])

    return (
        <>
        <div className="boxart-container inline-block">
            <video className="boxart-img" src={moviesData.thumbnail} type="video/mp4"/>
       </div>
       </>
    )
}

export default Card;