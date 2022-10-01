import React, { FC } from 'react';

import Animation from '@/components/animation/Animation';

import { PlayListInt, StripeDataInt } from '@/types/playList';

import { connect } from 'react-redux';
import StripeList from '@/components/list/stripeList/StripeList';

interface PropsInt {
    data: PlayListInt[];
    isPhone: boolean;
}

const SearchPlaylist: FC<PropsInt> = ({ data, isPhone }) => {
    return (
        <Animation>
            <div>
                <StripeList
                    data={data as StripeDataInt[]}
                    module="playlist"
                ></StripeList>
            </div>
        </Animation>
    );
};

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

export default connect(mapStateToProps)(SearchPlaylist);
