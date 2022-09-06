import React, { FC, useEffect, useState } from 'react';

import Animation from '@/components/animation/Animation';

import style from './css/playList.module.less';
import PlayListCard from './PlayListCard';
import { playlistHighquality } from '@/api/api_playlist';
import { HighqualityInt, PlaylistsInt } from '@/types/playList';

const PlayList: FC = () => {
    const [playlists, setPlaylists] = useState<PlaylistsInt>({});
    const getHighquality = async () => {
        const params = {
            limit: 1,
            cat: '全部',
        };
        const res: HighqualityInt = (await playlistHighquality(
            params,
        )) as HighqualityInt;
        if (res.code === 200) {
            setPlaylists(res.playlists[0]);
        }
    };
    useEffect(() => {
        getHighquality();
    }, []);
    return (
        <Animation>
            <div className={style.page}>
                <PlayListCard data={playlists}></PlayListCard>
            </div>
        </Animation>
    );
};

export default PlayList;
