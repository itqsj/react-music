import React, { FC, useLayoutEffect, useState } from 'react';

import Animation from '@/components/animation/Animation';
import OfficialTop from './OfficialTop';

import style from './css/topList.module.less';

import { allTopList } from '@/api/api_playlist';
import { PlayListInt } from '@/types/playList';
import GlobalTop from './GlobalTop';

interface ResTopList {
    artistToplist: PlayListInt;
    code: number;
    list: PlayListInt[];
}

const TopList: FC = () => {
    const [topOfficalList, setTopOfficalList] = useState<PlayListInt[]>(
        [] as PlayListInt[],
    );
    const [globalTopList, setGlobalTopList] = useState<PlayListInt[]>(
        [] as PlayListInt[],
    );
    const getAllTopList = async () => {
        const res: ResTopList = (await allTopList()) as ResTopList;
        if (res.code === 200) {
            const officalListRes = res.list.filter((item) => item.ToplistType);
            const globalListRes = res.list.filter((item) => !item.ToplistType);
            setTopOfficalList(officalListRes);
            setGlobalTopList(globalListRes);
        }
    };
    useLayoutEffect(() => {
        getAllTopList();
    }, []);
    return (
        <Animation>
            <div className={style.page}>
                <OfficialTop data={topOfficalList}></OfficialTop>
                <GlobalTop data={globalTopList}></GlobalTop>
            </div>
        </Animation>
    );
};

export default TopList;
