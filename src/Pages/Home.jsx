import React from 'react'
import Hero from '../Component/Hero/Hero'
import Offers from '../Component/Offers/Offers'
import NewArrival from '../Component/NewArrival/NewArrival'
import Footer from '../Component/Footer/Footer'

const Home = () => {
  return (
    <div>
       <Hero />
       <Offers />
       <NewArrival />
       <Footer />
    </div>
  )
}

export default Home
