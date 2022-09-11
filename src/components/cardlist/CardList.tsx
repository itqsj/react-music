import React, { FC } from 'react';

import Card from './card/Card';

import style from './css/cardList.module.less';
import { PersonRecomInt, PlayListInt } from '@/types/playList';
import { useNavigate } from 'react-router-dom';

interface PropsInt {
    data?: PersonRecomInt[] | PlayListInt[];
}

const CardList: FC<PropsInt> = React.memo(({ data = [] }) => {
    const navigate = useNavigate();

    return (
        <div className={style.page}>
            {data.map((item: PersonRecomInt | PlayListInt) => (
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
});

export default CardList;
