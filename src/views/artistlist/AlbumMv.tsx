import React, { FC, useLayoutEffect, useState } from 'react';

import Animation from '@/components/animation/Animation';

import style from './css/albumMv.module.less';
import MvList from '@/components/mvList/MvList';
import { ArtistMvInt } from '@/types/artist';

interface PropsInt {
    data: ArtistMvInt[];
}
const AlbumMv: FC<PropsInt> = React.memo(({ data }) => {
    return (
        <Animation>
            <MvList list={data}></MvList>
        </Animation>
    );
});

export default AlbumMv;
