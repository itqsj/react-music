import React, { FC } from 'react';

import { RecomVideoInt } from '@/types/video';
import style from './css/recomViodeItem.module.less';
interface PropsInt {
    data: RecomVideoInt;
}

const RecomViodeItem: FC<PropsInt> = ({ data }) => {
    return (
        <div className={[style.item, 'mbottom-5'].join(' ')}>
            <div className={style.item_left}>
                <img src={data.picUrl} alt="" />
            </div>
            <div className={[style.item_right, 'mleft-10'].join(' ')}>
                <p className="font-14 font-bold">{data.name}</p>
                <p className="font-12 mtop-10">by &nbsp;{data.artistName}</p>
            </div>
        </div>
    );
};

export default RecomViodeItem;
