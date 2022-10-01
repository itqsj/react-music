import React, { FC, useEffect, useState } from 'react';

import Animation from '@/components/animation/Animation';
import NormalTabs from '@/components/tab/Tabs';
import PlayList from '@/components/list/playList/PlayList';
import SearchAlbum from './SearchAlbum';
import SearchSinger from './SearchSinger';

import { cloudSearch } from '@/api/api_playlist';
import { useSearchParams } from 'react-router-dom';
import style from './css/search.module.less';
import { ResSearchInt, TracksInt } from '@/types/playList';
import { NewSongsInt } from '@/types/playList';
import { ArtistList } from '@/types/artist';

const Search: FC = () => {
    const [search] = useSearchParams();
    const keywords = search.get('key');
    const [songCount, setSongCount] = useState<number>(0);
    const [songs, setSongs] = useState<TracksInt[]>([] as TracksInt[]);
    const [album, setAlbum] = useState<NewSongsInt[]>([] as NewSongsInt[]);
    const [singers, setSingers] = useState<ArtistList[]>([] as ArtistList[]);
    const tabData = [
        {
            label: '单曲',
            value: '1',
            children: <PlayList data={songs ?? []}></PlayList>,
        },
        {
            label: '专辑',
            value: '10',
            children: <SearchAlbum data={album}></SearchAlbum>,
        },
        {
            label: '歌手',
            value: '100',
            children: <SearchSinger data={singers}></SearchSinger>,
        },
        {
            label: '歌单',
            value: '1000',
            children: <div>23</div>,
        },
        {
            label: '用户',
            value: '1002',
            children: <div>23</div>,
        },
        {
            label: 'mv',
            value: '1004',
            children: <div>23</div>,
        },
    ];
    const getCloudSearch = async (
        type: number,
        callback?: (res: ResSearchInt) => void,
    ) => {
        const params = {
            keywords,
            limit: 30,
            type,
            offset: 0,
        };
        const res: ResSearchInt = (await cloudSearch(params)) as ResSearchInt;
        if (res.code === 200) {
            callback && callback(res);
        }
    };
    const setSongsCall = (res: ResSearchInt) => {
        setSongCount(res.result.songCount);
        setSongs(res.result.songs as TracksInt[]);
    };
    const setAlbumCall = (res: ResSearchInt) => {
        setSongCount(res.result.albumCount);
        setAlbum(res.result.albums as NewSongsInt[]);
    };
    const setSingerCall = (res: ResSearchInt) => {
        setSongCount(res.result.artistCount);
        setSingers(res.result.artists);
    };
    const handleTabChange = (value: number | string) => {
        switch (value) {
            case '1':
                getCloudSearch(1, setSongsCall);
                break;
            case '10':
                getCloudSearch(10, setAlbumCall);
                break;
            case '100':
                getCloudSearch(100, setSingerCall);
                break;
            case '1000':
                getCloudSearch(1000);
                break;
            case '1002':
                getCloudSearch(1002);
                break;
            case '1004':
                getCloudSearch(1004);
                break;
        }
    };
    useEffect(() => {
        getCloudSearch(1, setSongsCall);
    }, []);

    return (
        <Animation>
            <div className={style.page}>
                <h3 className="font-14 font-bold">
                    找到<span>{songCount}</span>首歌
                </h3>
                <NormalTabs
                    tabs={tabData}
                    change={handleTabChange}
                ></NormalTabs>
            </div>
        </Animation>
    );
};

export default Search;
