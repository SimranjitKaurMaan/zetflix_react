import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/NavBar';
import Section from './components/Section';
const host = process.env.hasOwnProperty('URL') ? process.env.URL : 'http://localhost:8888/';

function App() {
   const [genres,setGenres] = useState(null);

   const fetchData = async () => {
     console.log("host:" , host)
     var url = new URL(`.netlify/functions/getGenres`,host)
     console.log("url: ",`${host}.netlify/functions/getGenres`)
     const response = await fetch(url)
     const responseBody = await response.json()
     setGenres(responseBody)
   }
  

   useEffect(()=>{
     fetchData();
   },[])

  return (
    <>
      <Navbar/>
      <HeroSection/>
      { genres && Object.values(genres).map ((genre)=>(<Section genre={genre.genre}/>))}
      <Footer/>
    </>
  );
}

export default App;
