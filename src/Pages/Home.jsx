import React from 'react'
import Hero from '../Component/Hero/Hero'
import Offers from '../Component/Offers/Offers'
import NewArrival from '../Component/NewArrival/NewArrival'
import Footer from '../Component/Footer/Footer'
import Category from '../Component/Category/Category'
// import BabyProductsBrand from '../Component/Brand/BabyProductBrand'

const Home = () => {
  return (
    <div>
       <Hero />
       {/* <BabyProductsBrand /> */}
       <Offers />
       <Category />
       <NewArrival />
       <Footer />
    </div>
  )
}

export default Home
