import React, { FC } from 'react';

import { NewSongsInt } from '@/types/playList';

import StripeListItem from './StripeListItem';

interface PropsInt {
    data: NewSongsInt[];
    module?: string;
}

const StripeList: FC<PropsInt> = ({ data, module = 'song' }) => {
    return (
        <div>
            {data.map((item, index) => (
                <StripeListItem
                    module={module}
                    data={item}
                    key={item.id}
                    index={index}
                ></StripeListItem>
            ))}
        </div>
    );
};

export default StripeList;
