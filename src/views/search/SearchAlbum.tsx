import React, { FC } from 'react';

import Animation from '@/components/animation/Animation';

import { NewSongsInt } from '@/types/playList';
import NewMusicItem from '../newMusic/NewMusicItem';
import { connect } from 'react-redux';

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
                {data.map((item, index) => (
                    <NewMusicItem
                        module="album"
                        data={item}
                        key={item.id}
                        index={index}
                    ></NewMusicItem>
                ))}
            </div>
        </Animation>
    );
};

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

export default connect(mapStateToProps)(SearchAlbum);
