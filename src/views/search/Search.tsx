import React, { FC, useEffect, useState } from 'react';

import Animation from '@/components/animation/Animation';
import NormalTabs from '@/components/tab/Tabs';
import PlayList from '@/components/playList/PlayList';

import { cloudSearch } from '@/api/api_playlist';
import { useSearchParams } from 'react-router-dom';
import style from './css/search.module.less';
import { ResSearchInt, TracksInt } from '@/types/playList';

const Search: FC = () => {
    const [search] = useSearchParams();
    const keywords = search.get('key');
    const [songCount, setSongCount] = useState<number>(0);
    const [songs, setSongs] = useState<TracksInt[]>([] as TracksInt[]);
    const tabData = [
        {
            label: '单曲',
            value: '1',
            children: <PlayList data={songs ?? []}></PlayList>,
        },
        {
            label: '专辑',
            value: '2',
            children: <div>23</div>,
        },
        {
            label: '歌手',
            value: '3',
            children: <div>23</div>,
        },
        {
            label: '歌单',
            value: '4',
            children: <div>23</div>,
        },
        {
            label: '用户',
            value: '5',
            children: <div>23</div>,
        },
        {
            label: 'mv',
            value: '6',
            children: <div>23</div>,
        },
    ];
    const getCloudSearch = async () => {
        const params = {
            keywords,
            limit: 30,
            type: 1,
            offset: 0,
        };
        const res: ResSearchInt = (await cloudSearch(params)) as ResSearchInt;
        if (res.code === 200) {
            setSongs(res.result.songs);
            setSongCount(res.result.songCount);
        }
    };
    useEffect(() => {
        getCloudSearch();
    }, []);

    return (
        <Animation>
            <div className={style.page}>
                <h3 className="font-14 font-bold">
                    找到<span>{songCount}</span>首歌
                </h3>
                <NormalTabs
                    tabs={tabData}
                    // change={handleTabChange}
                ></NormalTabs>
            </div>
        </Animation>
    );
};

export default Search;
