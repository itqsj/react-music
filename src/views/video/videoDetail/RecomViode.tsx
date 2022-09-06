import React, { FC, useEffect, useState } from 'react';

import { personalizedMv } from '@/api/api_video';
import RecomViodeItem from './RecomViodeItem';

import { PersonalRecomVideoInt, RecomVideoInt } from '@/types/video';

const RecomViode: FC = () => {
    const [recomList, setRecomList] = useState<Array<RecomVideoInt>>([]);
    useEffect(() => {
        getPersonalizedMv();
    }, []);
    const getPersonalizedMv = async () => {
        const res: PersonalRecomVideoInt =
            (await personalizedMv()) as PersonalRecomVideoInt;
        if (res.code === 200) {
            setRecomList(res.result);
        }
    };
    return (
        <div>
            <h3 className="font-14 mbottom-10">相关推荐</h3>
            {recomList.map((item) => (
                <RecomViodeItem key={item.id} data={item}></RecomViodeItem>
            ))}
        </div>
    );
};

export default RecomViode;
