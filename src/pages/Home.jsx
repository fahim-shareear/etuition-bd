import React from 'react';
import Banner from '../components/shared/Banner';
// import LatestTuitions from '../components/shared/LatestTuitions';
import HowItWorks from '../components/HowItWorks';
import StatsCounter from '../components/Stats';
// import PopularTutors from '../components/Tutors';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <StatsCounter></StatsCounter>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;