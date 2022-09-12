import React, { FC } from 'react';

import style from './css/card.module.less';
import { PersonRecomInt, PlayListInt } from '@/types/playList';
import { ArtistList } from '@/types/artist';

interface PropsInt {
    data: PersonRecomInt | PlayListInt | ArtistList;
    navigate: () => void;
}

const Card: FC<PropsInt> = React.memo((props) => {
    return (
        <div
            className={style.card}
            onClick={() => {
                props.navigate();
            }}
        >
            <img
                className={style.card_img}
                src={
                    (props.data.picUrl ?? props.data.coverImgUrl) +
                    '?param=300y300'
                }
                alt=""
            />
            <p className={style.card_title}>{props.data.name}</p>
            <div className={style.card_icon}>
                <div className={style.card_icon_play}></div>
            </div>
        </div>
    );
});

export default Card;
