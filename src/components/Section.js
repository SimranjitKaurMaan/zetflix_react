import { useState , useEffect} from "react"
import Card from './Card';

const Section = ({genre}) => {
    const [moviesList,setMoviesList] = useState([]);

    const fetchData = async () => {
      const moviesListResponse = await fetch(`.netlify/functions/getMoviesList?genre=${genre}`,{
        method: "GET"
      })
      const moviesListResponseBody = await moviesListResponse.json()
      setMoviesList(moviesListResponseBody)
      console.log(moviesListResponseBody)
    }
   
 
    useEffect(()=>{
      fetchData();
    },[])

    return (
        <>
        <div class="row-header">{genre}</div>
        {moviesList && (<div className="row">
            <div className="row-content">
                {moviesList.map((movie)=>(<Card movie={movie.title}/>))}
            </div>
        </div>)}
        </>
    )
}

export default Section;