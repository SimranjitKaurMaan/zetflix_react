import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/NavBar';
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
      <Navbar/>
      <HeroSection/>
      { genres && Object.values(genres).map ((genre)=>(<Section genre={genre.genre}/>))}
      <Footer/>
    </>
  );
}

export default App;
