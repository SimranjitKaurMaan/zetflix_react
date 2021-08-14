import { useEffect, useState } from 'react';
import './App.css';
import Section from './components/Section';

function App() {
   const [genres,setGenres] = useState(null);

   const fetchData = async () => {
     const response = await fetch(".netlify/functions/getGenres")
     const responseBody = await response.json()
     setGenres(responseBody)
   }
  

   useEffect(()=>{
     fetchData();
   },[])

  return (
    <>
       <nav className="navigation container">
        <a className="nav-brand link" href="/">ZETFLIX</a>
        <ul className="list-non-bullet nav-pills">
            <li className="list-item-inline">
                <a className="link link-active" href="/">Home</a>
            </li>
            <li className="list-item-inline">
                <a className="link" href="/">TV Shows</a>
            </li>
            <li className="list-item-inline">
                <a className="link" href="/">Movies</a>
            </li>
            <li className="list-item-inline">
                <a className="link" href="/">New and Popular</a>
            </li>
            <li className="list-item-inline">
                <a className="link" href="/">My List</a>
            </li>
        </ul>
    </nav>
      { genres && Object.values(genres).map ((genre)=>(<Section genre={genre.genre}/>))}
      <div className="footer">
        <div className="social-links">
            <a href="/" target="_blank"><span className="facebook-link"></span></a>
            <a href="/" target="_blank"><span className="instagram-link"></span></a>
            <a href="/" target="_blank"><span className="twitter-link"></span></a>
            <a href="/" target="_blank"><span className="youtube-link"></span></a>
        </div>
        <ul className="footer-links list-non-bullet">
            <li className="footer-link-wrapper"><a href="/">Audio and Subtitles</a></li>
            <li className="footer-link-wrapper"><a href="/">Audio Description</a></li>
            <li className="footer-link-wrapper"><a href="/">Help Centre</a></li>
            <li className="footer-link-wrapper"><a href="/">Gift Cards</a></li>
            <li className="footer-link-wrapper"><a href="/">Media Centre</a></li>
            <li className="footer-link-wrapper"><a href="/">Investor Relations</a></li>
            <li className="footer-link-wrapper"><a href="/">Jobs</a></li>
            <li className="footer-link-wrapper"><a href="/">Terms of Use</a></li>
            <li className="footer-link-wrapper"><a href="/">Privacy</a></li>
            <li className="footer-link-wrapper"><a href="/">Contact Us</a></li>

        </ul>
        <div className="footer-copyright">© 2020-2021 ZetFlix, Inc.
        </div>
    </div>
    </>
  );
}

export default App;
