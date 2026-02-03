import React from 'react';
import Banner from '../components/shared/Banner';
import LatestTuitions from '../components/shared/LatestTuitions';
import HowItWorks from '../components/HowItWorks';
import StatsCounter from '../components/Stats';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <StatsCounter></StatsCounter>
            <LatestTuitions></LatestTuitions>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;