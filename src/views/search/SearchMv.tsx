import React, { FC, Fragment } from 'react';

import Animation from '@/components/animation/Animation';
import MvList from '@/components/list/mvList/MvList';

import { MvInfoInt, MvListInt } from '@/types/video';
import { connect } from 'react-redux';

interface PropsInt {
    data: MvInfoInt[];
    isPhone: boolean;
}

const SearchMv: FC<PropsInt> = ({ data, isPhone }) => {
    return (
        <Animation>
            <Fragment>
                <MvList list={data as MvListInt[]}></MvList>
            </Fragment>
        </Animation>
    );
};

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

export default connect(mapStateToProps)(SearchMv);
