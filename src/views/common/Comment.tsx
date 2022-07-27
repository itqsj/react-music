import React, { FC, useEffect, useState } from 'react';

import { TextField } from '@mui/material';
import { motion } from 'framer-motion';

import style from './css/comment.module.less';

interface PropsInt {
    // id?: string;
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

const Common: FC<PropsInt> = () => {
    const [commonVal, setCommonVal] = useState<string>('');
    useEffect(() => {
        console.log(132);
    }, []);
    const handleCommonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommonVal(event.target.value);
    };
    return (
        <motion.div
            className="single"
            initial="exit"
            animate="enter"
            exit="exit"
        >
            <motion.div
                key="modal"
                className={style.page}
                variants={imageVariants}
            >
                <TextField
                    label="请输入评论"
                    multiline
                    rows={3}
                    value={commonVal}
                    className={style.page_input}
                    onChange={handleCommonChange}
                />
            </motion.div>
        </motion.div>
    );
};

export default Common;
