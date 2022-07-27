import React from 'react';

import style from './css/card.module.less';
import { PersonalInt } from '@/types/personalRecom';

interface PropsInt {
    data: PersonalInt;
    navigate: () => void;
}

function Card(props: PropsInt) {
    return (
        <div
            className={style.card}
            onClick={() => {
                props.navigate();
            }}
        >
            <img className={style.card_img} src={props.data.picUrl} alt="" />
            <p className={style.card_title}>{props.data.name}</p>
            <div className={style.card_icon}>
                <div className={style.card_icon_play}></div>
            </div>
        </div>
    );
}

export default Card;
