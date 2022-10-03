import React, { useEffect, useState } from 'react';

import RouterTab from '@/components/tab/RouterTab';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomeRouter from '@/router/HomeRouter';

const transition = {
    duration: 1,
    ease: [0.43, 0.13, 0.23, 0.96],
};

const imageVariants = {
    exit: { y: '25%', opacity: 0, transition },
    enter: {
        y: '0%',
        opacity: 1,
        transition,
    },
};

function Home() {
    // const navigate = useNavigate();
    // const { pathname } = useLocation();
    // useEffect(() => {
    //     if (pathname === '/home') {
    //         navigate('/home/personalRecom');
    //     }
    // }, []);
    return (
        <div>
            <RouterTab></RouterTab>
            <div>
                {/* <Outlet /> */}
                <HomeRouter></HomeRouter>
            </div>
        </div>
    );
}

export default Home;
