import React from 'react'

import Hero from './Hero'
import OurStory from './OurStory'
import OurShop from './OurShop'
import VideoSection from './VideoSection'
import Feedback from './Feedback'


const Home = () => {
    return (
        <div className='overflow-hidden bg-black'>
            <Hero />
            <OurStory />
            <OurShop />
            <VideoSection />
            <Feedback />
        </div>
    )
}

export default Home