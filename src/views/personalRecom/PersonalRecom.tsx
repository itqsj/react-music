import React, { useEffect, useState } from 'react';

import Card from './card/Card';
import Carousel from '@/components/swiper/Carousel';
import { AnimatePresence, motion } from 'framer-motion';

import { PersonalInt } from '@/types/personalRecom';

import style from './css/personalRecom.module.less';
import { getPersonalized } from '@/api/api_playlist';
import { useNavigate } from 'react-router-dom';

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

function PersonalRecom() {
    const navigate = useNavigate();
    const [personalList, setPersonalList] = useState<object[]>([]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getPersonalized().then(({ result }: PersonalInt[]) => {
            setPersonalList(result);
        });
    }, []);

    return (
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
                <div className={style.page}>
                    {/* <Carousel></Carousel> */}
                    <h3 className={style.page_title}>
                        今日推荐<i className={style.page_title_icon}></i>
                    </h3>
                    <div className={style.page_list}>
                        {personalList.map((personal: PersonalInt) => (
                            <Card
                                data={personal}
                                key={personal.id}
                                navigate={() => {
                                    navigate(`/songlist?id=${personal.id}`);
                                }}
                            ></Card>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default PersonalRecom;
