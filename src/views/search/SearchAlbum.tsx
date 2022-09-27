import React, { FC } from 'react';

import Animation from '@/components/animation/Animation';

import { NewSongsInt } from '@/types/playList';

import { connect } from 'react-redux';
import StripeList from '@/components/list/stripeList/StripeList';

interface PropsInt {
    data: NewSongsInt[];
    isPhone: boolean;
}

const SearchAlbum: FC<PropsInt> = ({ data, isPhone }) => {
    return (
        <Animation>
            <div
                style={{
                    overflow: 'auto',
                    maxHeight: isPhone
                        ? 'calc(100vh - 250px)'
                        : 'calc(100vh - 280px)',
                }}
            >
                <StripeList data={data}></StripeList>
            </div>
        </Animation>
    );
};

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

export default connect(mapStateToProps)(SearchAlbum);
