import React, { FC, useState } from 'react';

import ArtistType from './ArtistType';
import Animation from '@/components/animation/Animation';
import CardList from '@/components/cardlist/CardList';

import style from './css/artistlist.module.less';
import { artistList } from '@/api/api_artist';
import { TypeInt, ParamsInt, ResArtistList, ArtistList } from '@/types/artist';
// interface PropsInt {}

const Artistlist: FC = () => {
    const [singerList, setSingerList] = useState<ArtistList[]>([]);
    const getArtistList = async (
        activeArea: TypeInt,
        activeType: TypeInt,
        activeInitial: TypeInt,
    ) => {
        const params: ParamsInt = {
            area: activeArea.value,
            type: activeType.value,
            initial: activeInitial.value,
            offset: 0,
            limit: 30,
        } as ParamsInt;
        const res: ResArtistList = (await artistList(params)) as ResArtistList;
        if (res.code === 200) {
            setSingerList(res.artists);
        }
    };
    return (
        <Animation>
            <div className={style.page}>
                <ArtistType handleChangeActive={getArtistList}></ArtistType>
                <CardList data={singerList} module={2}></CardList>
            </div>
        </Animation>
    );
};

export default Artistlist;
