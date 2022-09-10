import React, { useEffect, useState } from 'react';

import { PersonRecomInt, ResPersonalInt } from '@/types/playList';

import style from './css/personalRecom.module.less';
import { getPersonalized } from '@/api/api_playlist';
import Animation from '@/components/animation/Animation';
import CardList from '@/components/cardlist/CardList';

function PersonalRecom() {
    const [personalList, setPersonalList] = useState<PersonRecomInt[]>([]);

    const getPersonalizedList = async () => {
        const res: ResPersonalInt = (await getPersonalized()) as ResPersonalInt;
        if (res.code === 200) {
            setPersonalList(res.result);
        }
    };
    useEffect(() => {
        getPersonalizedList();
    }, []);

    return (
        <Animation>
            <div className={style.page}>
                {/* <Carousel></Carousel> */}
                <h3 className={style.page_title}>
                    今日推荐<i className={style.page_title_icon}></i>
                </h3>
                <CardList data={personalList}></CardList>
            </div>
        </Animation>
    );
}

export default PersonalRecom;
