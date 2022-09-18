import React, { FC } from 'react';

import MvItem from './MvItem';

import { ArtistMvInt } from '@/types/artist';
import style from './css/mvList.module.less';

interface PropsInt {
    list: ArtistMvInt[];
}
const MvList: FC<PropsInt> = ({ list }) => {
    return (
        <div className={style.page}>
            {list.map((item) => (
                <MvItem key={item.id} data={item}></MvItem>
            ))}
        </div>
    );
};

export default MvList;
