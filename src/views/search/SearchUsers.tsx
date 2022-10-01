import React, { FC } from 'react';

import Animation from '@/components/animation/Animation';

import { StripeDataInt } from '@/types/playList';
import { ProfileInt } from '@/types/user';

import { connect } from 'react-redux';
import StripeList from '@/components/list/stripeList/StripeList';

interface PropsInt {
    data: ProfileInt[];
    isPhone: boolean;
}

const SearchUsers: FC<PropsInt> = ({ data, isPhone }) => {
    return (
        <Animation>
            <div>
                <StripeList
                    data={data as StripeDataInt[]}
                    module="users"
                ></StripeList>
            </div>
        </Animation>
    );
};

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

export default connect(mapStateToProps)(SearchUsers);
