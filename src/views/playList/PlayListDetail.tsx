import React, { useEffect, useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import SongListInfo from './playListDetInfo/PlayListDetInfo';
import NormalTabs from '@/components/tab/Tabs';
const PlayList = React.lazy(() => import('@/components/playList/PlayList'));
const PlayComment = React.lazy(() => import('@/views/common/PlayComment'));
const Animation = React.lazy(() => import('@/components/animation/Animation'));
const Collector = React.lazy(() => import('@/views/collector/Collector'));

import style from './css/playListDetail.module.less';
import { playListDetail } from '@/api/api_playlist';
import { useSearchParams } from 'react-router-dom';
import { PlayListDetailInt, PlayListItemInt } from '@/types/playList';

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

function PlayListDetail() {
    const [tabVal, setTabVal] = useState<string>('1');
    const [playlist, setPlaylist] = useState<PlayListItemInt>(
        {} as PlayListItemInt,
    );
    const hasPlayList = useMemo(() => {
        const has = JSON.stringify(playlist) !== '{}';
        return has;
    }, [playlist]);
    const [search] = useSearchParams();
    const getPlayListDetail = async () => {
        const params = {
            id: search.get('id'),
        };

        const res: PlayListDetailInt = (await playListDetail(
            params,
        )) as PlayListDetailInt;
        if (res.code === 200) {
            setPlaylist(res.playlist as PlayListItemInt);
        }
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
            children: <PlayComment></PlayComment>,
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
                {/* <div style={{ height: '50px' }}></div> */}
            </div>
        </Animation>
    );
}

export default PlayListDetail;
