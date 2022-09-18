import React, { FC } from 'react';

import style from './css/newMusicItem.module.less';
import { NewSongsInt } from '@/types/newMusic';

interface PropsInt {
    data: NewSongsInt;
    index: number;
}

const NewMusicItem: FC<PropsInt> = React.memo(({ data, index }) => {
    return (
        <div
            className={[style.item, 'font-14'].join(' ')}
            style={{
                background: index % 2 === 1 ? '#f9f9f9' : '',
            }}
        >
            <div className={[style.item_index].join(' ')}>{index + 1}</div>
            <div className={style.item_img}>
                <img src={data.album.picUrl + '?param=100y100'} alt="" />
            </div>
            <div className={[style.item_name, 'mleft-10'].join(' ')}>
                {data.name}
            </div>
            <div className={[style.item_info, 'font-12'].join(' ')}>
                {data.artists.map((item) => (
                    <span key={item.id}>{item.name}</span>
                ))}
            </div>
            <div className={[style.item_info, 'font-12'].join(' ')}>
                {data.album.name}
            </div>
            <div className={['font-12', style.item_time].join(' ')}>
                {data.duration}
            </div>
        </div>
    );
});

export default NewMusicItem;
