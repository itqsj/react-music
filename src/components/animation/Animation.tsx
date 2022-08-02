import React, { FC, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PropInt {
    children: ReactNode;
}

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

const Animation: FC<PropInt> = ({ children }) => {
    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div
                className="single"
                initial="exit"
                animate="enter"
                exit="exit"
            >
                <motion.div key="modal" variants={imageVariants}>
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Animation;
