import React, { useEffect, useState } from 'react';

import Card from './card/Card';

import { PersonalInt } from '@/types/personalRecom';

import style from './css/personalRecom.module.less';
import { getPersonalized } from '@/api/api_playlist';
import { useNavigate } from 'react-router-dom';
import Animation from '@/components/animation/Animation';

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
        <Animation>
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
        </Animation>
    );
}

export default PersonalRecom;
