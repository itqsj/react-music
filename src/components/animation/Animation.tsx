import React, { FC, ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface PropInt {
    children: ReactNode;
    type?: string;
}

const transition = {
    duration: 0.8,
    ease: [0.43, 0.13, 0.23, 0.96],
};

const move = {
    exit: { y: '25%', opacity: 0, transition },
    enter: {
        y: '0%',
        opacity: 1,
        transition,
    },
};

const opacity = {
    exit: { opacity: 0, transition },
    enter: {
        opacity: 1,
        transition,
    },
};

const typeObj = {
    move,
    opacity,
};

const Animation: FC<PropInt> = ({ children, type = 'move' }) => {
    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div
                className="single"
                initial="exit"
                animate="enter"
                exit="exit"
            >
                <motion.div key="modal" variants={typeObj[type]}>
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Animation;
