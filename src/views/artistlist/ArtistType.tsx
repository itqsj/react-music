import React, { FC, useState, useCallback, useEffect } from 'react';

import ArtistTypeItem from './ArtistTypeItem';

import style from './css/artistType.module.less';
import { TypeInt } from '@/types/artist';

interface PropsInt {
    handleChangeActive: (
        activeArea: TypeInt,
        activeType: TypeInt,
        activeInitial: TypeInt,
    ) => void;
}

const ArtistType: FC<PropsInt> = React.memo(({ handleChangeActive }) => {
    const typeArr = [
        {
            type: '语种',
            lists: [
                {
                    name: '全部',
                    value: -1,
                },
                {
                    name: '华语',
                    value: 7,
                },
                {
                    name: '欧美',
                    value: 96,
                },
                {
                    name: '日本',
                    value: 8,
                },
                {
                    name: '韩国',
                    value: 16,
                },
                {
                    name: '其他',
                    value: 0,
                },
            ],
        },
        {
            type: '分类',
            lists: [
                {
                    name: '全部',
                    value: -1,
                },
                {
                    name: '男歌手',
                    value: 1,
                },
                {
                    name: '女歌手',
                    value: 2,
                },
                {
                    name: '乐队',
                    value: 3,
                },
            ],
        },
        {
            type: '筛选',
            lists: [
                {
                    name: '全部',
                    value: -1,
                },
                {
                    name: 'A',
                    value: 'a',
                },
                {
                    name: 'B',
                    value: 'b',
                },
                {
                    name: 'C',
                    value: 'c',
                },
                {
                    name: 'D',
                    value: 'd',
                },
                {
                    name: 'E',
                    value: 'e',
                },
                {
                    name: 'F',
                    value: 'f',
                },
                {
                    name: 'G',
                    value: 'g',
                },
                {
                    name: 'H',
                    value: 'h',
                },
                {
                    name: 'I',
                    value: 'i',
                },
                {
                    name: 'J',
                    value: 'j',
                },
                {
                    name: 'K',
                    value: 'k',
                },
                {
                    name: 'L',
                    value: 'l',
                },
                {
                    name: 'M',
                    value: 'm',
                },
                {
                    name: 'N',
                    value: 'n',
                },
                {
                    name: 'O',
                    value: 'o',
                },
                {
                    name: 'P',
                    value: 'p',
                },
                {
                    name: 'Q',
                    value: 'q',
                },
                {
                    name: 'R',
                    value: 'r',
                },
                {
                    name: 'S',
                    value: 's',
                },
                {
                    name: 'T',
                    value: 't',
                },
                {
                    name: 'U',
                    value: 'u',
                },
                {
                    name: 'V',
                    value: 'v',
                },
                {
                    name: 'W',
                    value: 'w',
                },
                {
                    name: 'X',
                    value: 'x',
                },
                {
                    name: 'Y',
                    value: 'y',
                },
                {
                    name: 'Z',
                    value: 'z',
                },
                {
                    name: '#',
                    value: 0,
                },
            ],
        },
    ];

    const [activeArea, setActiveArea] = useState<TypeInt>({
        name: '全部',
        value: -1,
    });
    const [activeType, setActiveType] = useState<TypeInt>({
        name: '全部',
        value: -1,
    });
    const [activeInitial, setActiveInitial] = useState<TypeInt>({
        name: '全部',
        value: -1,
    });

    const handlerActiveChange = useCallback(
        (item: TypeInt, type: string) => {
            switch (type) {
                case '语种':
                    setActiveArea(item);
                    break;
                case '分类':
                    setActiveType(item);
                    break;
                case '筛选':
                    setActiveInitial(item);
                    break;
            }
        },
        [activeArea, activeType, activeInitial],
    );
    useEffect(() => {
        handleChangeActive(activeArea, activeType, activeInitial);
    }, [activeArea, activeType, activeInitial]);
    return (
        <div className={style.page}>
            {typeArr.map((item) => (
                <ArtistTypeItem
                    data={item}
                    key={item.type}
                    activeChange={handlerActiveChange}
                ></ArtistTypeItem>
            ))}
        </div>
    );
});

export default ArtistType;
