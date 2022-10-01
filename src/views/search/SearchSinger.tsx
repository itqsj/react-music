import React, { FC, Fragment } from 'react';

import Animation from '@/components/animation/Animation';

import { ArtistList } from '@/types/artist';
import { StripeDataInt } from '@/types/playList';
import { connect } from 'react-redux';
import StripeList from '@/components/list/stripeList/StripeList';

interface PropsInt {
    data: ArtistList[];
    isPhone: boolean;
}

const SearchSinger: FC<PropsInt> = ({ data, isPhone }) => {
    return (
        <Animation>
            <Fragment>
                <StripeList
                    data={data as StripeDataInt[]}
                    module="singer"
                ></StripeList>
            </Fragment>
        </Animation>
    );
};

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

export default connect(mapStateToProps)(SearchSinger);
