  import { useState , useEffect} from "react"
  import Card from './Card';
  const host = process.env.hasOwnProperty('DEPLOY_URL') ? process.env.DEPLOY_URL : 'http://localhost:8888/';
const Section = ({genre}) => {
    const [moviesList,setMoviesList] = useState([]);
    const [currentPageState,setCurrentPageState] = useState(null);
    var encodedGenre = encodeURIComponent(genre)
    const fetchData = async () => {
      const moviesListResponse = await fetch(`/.netlify/functions/getMoviesList?genre=${encodedGenre}&pageState=${currentPageState}`,{
        method: "GET"
      })
      const moviesListResponseBody = await moviesListResponse.json()
      setMoviesList(moviesListResponseBody.rows)
      setCurrentPageState(moviesListResponseBody.pageState)
      //console.log("inside section "+moviesListResponseBody.pageState)
      console.log('pageState inside section'+ currentPageState);
      console.log("movies list inside section"+JSON.stringify(moviesList));
      console.log("Genre :"+encodedGenre);
    }
   
    useEffect(()=>{
      fetchData();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <div class="row-header">{genre}</div>
        {moviesList && (<div className="row">
            <div className="row-content">
                {moviesList.map((movie)=>(<Card movie={movie.title}/>))}
                <div className="handle inline-block" onClick={()=>{
          setCurrentPageState(currentPageState)
          fetchData()
        }}></div>
            </div>
        </div>)}
        </>
    )
}

export default Section;