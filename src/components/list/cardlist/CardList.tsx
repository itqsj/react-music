import React, { FC, useCallback } from 'react';

import Card from './card/Card';

import style from './css/cardList.module.less';
import { PersonRecomInt, PlayListInt } from '@/types/playList';
import { ArtistList } from '@/types/artist';
import { useNavigate } from 'react-router-dom';

interface PropsInt {
    data?: PersonRecomInt[] | PlayListInt[] | ArtistList[];
    module?: number; //1为歌单列表，2为歌手列表
}

const CardList: FC<PropsInt> = React.memo(({ data = [], module = 1 }) => {
    const navigate = useNavigate();
    const handlerNavigate = useCallback((id: number) => {
        let path = '';
        switch (module) {
            case 1:
                path = `/playListDetail?id=${id}`;
                break;
            case 2:
                path = `/artistDetail?id=${id}`;
                break;
        }
        navigate(path);
    }, []);

    return (
        <div className={style.page}>
            {data.length !== 0 &&
                data.map(
                    (
                        item: PersonRecomInt | PlayListInt | ArtistList,
                        index: number,
                    ) => (
                        <Card
                            data={item}
                            key={index}
                            navigate={() => {
                                handlerNavigate(item.id as number);
                            }}
                        ></Card>
                    ),
                )}
        </div>
    );
});

export default CardList;
