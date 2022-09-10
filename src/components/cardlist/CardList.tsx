import React, { FC } from 'react';

import Card from './card/Card';

import style from './css/cardList.module.less';
import { PersonRecomInt, HighqualityPlstInt } from '@/types/playList';
import { useNavigate } from 'react-router-dom';

interface PropsInt {
    data?: PersonRecomInt[] | HighqualityPlstInt[];
}

const CardList: FC<PropsInt> = ({ data = [] }) => {
    const navigate = useNavigate();

    return (
        <div className={style.page}>
            {data.map((item: PersonRecomInt | HighqualityPlstInt) => (
                <Card
                    data={item}
                    key={item.id}
                    navigate={() => {
                        navigate(`/playListDetail?id=${item.id}`);
                    }}
                ></Card>
            ))}
        </div>
    );
};

export default CardList;
