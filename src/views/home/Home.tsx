import React, { useEffect, useState } from 'react';

import RouterTab from '@/components/tab/RouterTab';

import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

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
    return (
        <div
            style={{
                padding: '0 20px',
            }}
        >
            <RouterTab></RouterTab>
            <div>
                <AnimatePresence>
                    <motion.div
                        className="single"
                        initial="exit"
                        animate="enter"
                        exit="exit"
                    >
                        <motion.div
                            style={{ overflow: 'hidden' }}
                            key="modal"
                            variants={imageVariants}
                        >
                            <Outlet />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Home;
