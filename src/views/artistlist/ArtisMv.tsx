import React, { FC } from 'react';

import Animation from '@/components/animation/Animation';

import style from './css/albumMv.module.less';
import MvList from '@/components/list/mvList/MvList';
import { MvListInt } from '@/types/video';

interface PropsInt {
    data: MvListInt[];
}
const AlbumMv: FC<PropsInt> = React.memo(({ data }) => {
    return (
        <Animation>
            <MvList list={data}></MvList>
        </Animation>
    );
});

export default AlbumMv;
