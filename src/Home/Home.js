import React from 'react'
import Header from '../Header/Header.js'
import HomeBody from './HomeBody.js'
import Footer from '../Footer/Footer.js'
import Gallery from './components/Gallery.jsx'
import Results from './components/Results.jsx'
import AboutUs from './components/AboutUs.jsx'
import Admission from './components/Admission.jsx'
import BackToTopButton from './components/backToTop.jsx'
const Home = () => {
  return (  
    <div style={{overflowX:'hidden'}}>
      <Header style={{width:'100%'}}/>           
      <HomeBody/>
      <Gallery/>
      <Results/>
      <AboutUs/>  
      <Admission/>
      <BackToTopButton/>
      <Footer style={{margin:0,padding:0}}/>  
    </div>
  )
}

export default Home
