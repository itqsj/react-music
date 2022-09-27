import React, { FC } from 'react';

import { NewSongsInt } from '@/types/playList';

import StripeListItem from './StripeListItem';

interface PropsInt {
    data: NewSongsInt[];
}

const StripeList: FC<PropsInt> = ({ data }) => {
    return (
        <div>
            {data.map((item, index) => (
                <StripeListItem
                    module="album"
                    data={item}
                    key={item.id}
                    index={index}
                ></StripeListItem>
            ))}
        </div>
    );
};

export default StripeList;
