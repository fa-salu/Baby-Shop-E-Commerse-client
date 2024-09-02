import React from 'react'
import Hero from '../Component/Hero/Hero'
import NewArrival from '../Component/NewArrival/NewArrival'
import Footer from '../Component/Footer/Footer'
import Category from '../Component/Category/Category'
import Trending from '../Component/Trending/Trending'
// import BabyProductsBrand from '../Component/Brand/BabyProductBrand'

const Home = () => {
  return (
    <div>
       <Hero />
       {/* <BabyProductsBrand /> */}
       <Trending />
       <Category />
       <NewArrival />
       <Footer />
    </div>
  )
}

export default Home
