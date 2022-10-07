import React, { FC } from 'react';

import Animation from '@/components/animation/Animation';

import { SongsInt, StripeDataInt } from '@/types/playList';

import { connect } from 'react-redux';
import StripeList from '@/components/list/stripeList/StripeList';

interface PropsInt {
    data: SongsInt[];
    isPhone: boolean;
}

const SearchAlbum: FC<PropsInt> = ({ data, isPhone }) => {
    return (
        <Animation>
            <div>
                <StripeList
                    data={data as StripeDataInt[]}
                    module="album"
                ></StripeList>
            </div>
        </Animation>
    );
};

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

export default connect(mapStateToProps)(SearchAlbum);
