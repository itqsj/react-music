import React, { useEffect, useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import SongListInfo from './songListInfo/SongListInfo';
import NormalTabs from '@/components/tab/Tabs';
const PlayList = React.lazy(() => import('@/components/playList/PlayList'));
const Common = React.lazy(() => import('@/views/common/Comment'));
const Animation = React.lazy(() => import('@/components/animation/Animation'));
const Collector = React.lazy(() => import('../collector/Collector'));

import style from './css/songlist.module.less';
import { playListDetail } from '@/api/api_playlist';
import { useSearchParams } from 'react-router-dom';
import {
    ParamsIdInt,
    PlayListDetailInt,
    PlayListInt,
} from '@/types/personalRecom';

const transition = {
    duration: 1,
    ease: [0.43, 0.13, 0.23, 0.96],
};

const imageVariants = {
    exit: { y: '25%', opacity: 0, transition },
    enter: {
        y: '0%',
        opacity: 1,
        transition,
    },
};

function SongList() {
    const [tabVal, setTabVal] = useState<string>('1');
    const [playlist, setPlaylist] = useState<PlayListInt>({} as PlayListInt);
    const hasPlayList = useMemo(() => {
        const has = JSON.stringify(playlist) !== '{}';
        return has;
    }, [playlist]);
    const [search] = useSearchParams();
    const getPlayListDetail = () => {
        const params: ParamsIdInt = {
            id: search.get('id'),
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        playListDetail(params).then((res: PlayListDetailInt) => {
            if (res.code === 200) {
                setPlaylist(res.playlist as PlayListInt);
            }
        });
    };
    useEffect(() => {
        if (tabVal === '1' && !hasPlayList) {
            getPlayListDetail();
        }
    }, [tabVal]);
    const tabData = [
        {
            label: '歌曲列表',
            value: '1',
            children: <PlayList data={playlist?.tracks ?? []}></PlayList>,
        },
        {
            label: '评论',
            value: '2',
            children: <Common></Common>,
        },
        {
            label: '收藏者',
            value: '3',
            children: <Collector></Collector>,
        },
    ];
    const handleTabChange = (tabVal: string) => {
        setTabVal(tabVal);
    };
    return (
        <Animation>
            <div className={style.page}>
                {hasPlayList && <SongListInfo data={playlist}></SongListInfo>}
                <div style={{ padding: '5px 15px' }}>
                    <NormalTabs
                        tabs={tabData}
                        change={handleTabChange}
                    ></NormalTabs>
                </div>
            </div>
        </Animation>
    );
}

export default SongList;
