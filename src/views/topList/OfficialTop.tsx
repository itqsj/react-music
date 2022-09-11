import React, { FC } from 'react';

import OfficialTopItem from './OfficialTopItem';

import style from './css/officialTop.module.less';
import { PlayListInt } from '@/types/playList';
interface PropsInt {
    data: PlayListInt[];
}

const OfficialTop: FC<PropsInt> = React.memo(({ data }) => {
    return (
        <div className={style.page}>
            <h3 className={['mtop-10', style.page_title].join(' ')}>官方榜</h3>
            {data.map((item) => (
                <OfficialTopItem key={item.id} data={item}></OfficialTopItem>
            ))}
        </div>
    );
});

export default OfficialTop;
