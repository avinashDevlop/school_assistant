import React from 'react'
import Header from '../Header/Header.js'
import HomeBody from './HomeBody.js'
import Footer from '../Footer/Footer.js'
const Home = () => {
  return (
    <div>
      <Header style={{width:'100%'}}/>           
      <HomeBody/>
      <Footer/>
    </div>
  )
}

export default Home
