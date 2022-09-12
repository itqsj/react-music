import React, { FC, useState } from 'react';

import CardList from '@/components/cardlist/CardList';

import style from './css/globalTop.module.less';
import { PlayListInt } from '@/types/playList';

interface PropsInt {
    data: PlayListInt[];
}

const GlobalTop: FC<PropsInt> = React.memo(({ data }) => {
    return (
        <div className={style.page}>
            <h3 className={['mtop-10', style.page_title].join(' ')}>官方榜</h3>
            <CardList data={data}></CardList>
        </div>
    );
});

export default GlobalTop;
