import React, { FC } from 'react';

import { SongsInt, StripeDataInt } from '@/types/playList';

import StripeListItem from './StripeListItem';

interface PropsInt {
    data: StripeDataInt[];
    module?: string;
}

const StripeList: FC<PropsInt> = React.memo(({ data, module = 'song' }) => {
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
});

export default StripeList;
