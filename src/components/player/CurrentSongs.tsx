import React, { FC, Fragment, useMemo } from 'react';
import { connect } from 'react-redux';

import PlayList from '../list/playList/PlayList';
import style from './css/currentSongs.module.less';
import { TracksInt } from '@/types/playList';

interface PropsInt {
    isPhone: boolean;
    currentPlaySongs: TracksInt[];
    currentSong: TracksInt;
}

const CurrentSongs: FC<PropsInt> = React.memo(
    ({ isPhone, currentPlaySongs, currentSong }) => {
        const composeCurrentIndex = useMemo(() => {
            const index = currentPlaySongs.findIndex(
                (item) => item.id === currentSong.id,
            );
            return index;
        }, [currentSong, currentPlaySongs]);
        return (
            <div className={style.page}>
                <div className={style.page_head}>
                    <h4 className="font-14">当前播放</h4>
                    <ul className={[style.page_head_body].join(' ')}>
                        <li>总 {currentPlaySongs.length} 首</li>
                        <li>当前播放第 {composeCurrentIndex + 1} 首</li>
                    </ul>
                </div>
                <PlayList module="current" data={currentPlaySongs}></PlayList>
            </div>
        );
    },
);

const mapStateToProps = function (store: any) {
    return {
        isPhone: store.UserReducer.isPhone,
        currentSong: store.PlayListReducer.currentSong,
        currentPlaySongs: store.PlayListReducer.currentPlaySongs,
    };
};

export default connect(mapStateToProps)(CurrentSongs);
