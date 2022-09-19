import React, { FC, useState } from 'react';

import style from './css/artistTypeItem.module.less';
import { TypeInt, DataInt } from '@/types/artist';

interface PropsInt {
    data: DataInt;
    activeChange: (item: TypeInt, type: string) => void;
}

const ArtistTypeItem: FC<PropsInt> = ({ data, activeChange }) => {
    const [active, setActive] = useState<TypeInt>({
        name: '全部',
        value: -1,
    });

    const handlerTagClick = (item: TypeInt) => {
        setActive(item);
        activeChange(item, data.type);
    };
    return (
        <div className={[style.item, 'font-14', 'mtop-10'].join(' ')}>
            <div className={style.item_left}>{data.type}：</div>
            <div className={[style.item_right, 'mleft-10'].join(' ')}>
                {data.lists.map((item) => (
                    <span
                        className={
                            active.value === item.value ? style.is_active : ''
                        }
                        key={item.value}
                        onClick={() => handlerTagClick(item)}
                    >
                        {item.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ArtistTypeItem;
