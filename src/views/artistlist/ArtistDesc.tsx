import React, { FC } from 'react';

import { ResArtistDescInt } from '@/types/artist';
import style from './css/artistDesc.module.less';

interface PropsInt {
    data: ResArtistDescInt;
}
const ArtistDesc: FC<PropsInt> = React.memo(({ data }) => {
    return (
        <div className={style.page}>
            <h3 className="font-14 mtop-10">个人简介</h3>
            <div className={[style.page_desc, 'font-14'].join(' ')}>
                {data.briefDesc}
            </div>
            {data.introduction?.map((item, index) => (
                <div key={index}>
                    <h3 className="font-14 mtop-10">{item.ti}</h3>
                    <div className={[style.page_desc, 'font-14'].join(' ')}>
                        {item.txt.split('\n').map((itemText, index) => (
                            <div key={index}>{itemText}</div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
});

export default ArtistDesc;
