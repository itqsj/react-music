import React, { FC, useEffect, useState, useMemo, useCallback } from 'react';

import Animation from '@/components/animation/Animation';
import NormalTabs from '@/components/tab/Tabs';
import PlayList from '@/components/list/playList/PlayList';
import SearchAlbum from './SearchAlbum';
import SearchSinger from './SearchSinger';
import SearchPlaylist from './SearchPlaylist';
import SearchUsers from './SearchUsers';
import SearchMv from './SearchMv';

import { cloudSearch } from '@/api/api_playlist';
import { useSearchParams, useLocation } from 'react-router-dom';
import style from './css/search.module.less';
import { ResSearchInt, TracksInt } from '@/types/playList';
import { NewSongsInt, PlayListInt } from '@/types/playList';
import { ArtistList } from '@/types/artist';
import { ProfileInt } from '@/types/user';
import { MvInfoInt } from '@/types/video';

const Search: FC = () => {
    const [search, setSearch] = useSearchParams();
    const keywords = search.get('key');
    const [activeTab, setActiveTab] = useState('1');
    const [songCount, setSongCount] = useState<number>(0);
    const [songs, setSongs] = useState<TracksInt[]>([] as TracksInt[]);
    const [album, setAlbum] = useState<NewSongsInt[]>([] as NewSongsInt[]);
    const [singers, setSingers] = useState<ArtistList[]>([] as ArtistList[]);
    const [playlist, setPlaylist] = useState<PlayListInt[]>(
        [] as PlayListInt[],
    );
    const [userlist, setUserlist] = useState<ProfileInt[]>([] as ProfileInt[]);
    const [mvlist, setMvlist] = useState<MvInfoInt[]>([] as MvInfoInt[]);
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
            children: <SearchPlaylist data={playlist}></SearchPlaylist>,
        },
        {
            label: '用户',
            value: '1002',
            children: <SearchUsers data={userlist}></SearchUsers>,
        },
        {
            label: 'mv',
            value: '1004',
            children: <SearchMv data={mvlist}></SearchMv>,
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
    const setPlaylistCall = (res: ResSearchInt) => {
        setSongCount(res.result.playlistCount);
        setPlaylist(res.result.playlists);
    };
    const setUserListCall = (res: ResSearchInt) => {
        setSongCount(res.result.userprofileCount);
        setUserlist(res.result.userprofiles);
    };
    const setMvlistCall = (res: ResSearchInt) => {
        setSongCount(res.result.mvCount);
        setMvlist(res.result.mvs);
    };
    const composeLabel = useMemo(() => {
        switch (activeTab) {
            case '1':
                return '歌曲';
            case '10':
                return '专辑';
            case '100':
                return '歌手';
            case '1000':
                return '歌单';
            case '1002':
                return '用户';
            case '1004':
                return 'MV';
        }
    }, [activeTab]);
    const handleTabChange = useCallback((value: string) => {
        switch (value) {
            case '1':
                // if (!setSongs.length) {
                getCloudSearch(1, setSongsCall);
                // }
                break;
            case '10':
                // if (!album.length) {
                getCloudSearch(10, setAlbumCall);
                // }
                break;
            case '100':
                // if (!singers.length) {
                getCloudSearch(100, setSingerCall);
                // }
                break;
            case '1000':
                // if (!playlist.length) {
                getCloudSearch(1000, setPlaylistCall);
                // }
                break;
            case '1002':
                // if (!userlist.length) {
                getCloudSearch(1002, setUserListCall);
                // }
                break;
            case '1004':
                // if (!mvlist.length) {
                getCloudSearch(1004, setMvlistCall);
                // }
                break;
        }
        setActiveTab(value);
    }, []);

    useEffect(() => {
        getCloudSearch(parseInt(activeTab), setSongsCall);
    }, [keywords]);

    return (
        <Animation>
            <div className={style.page}>
                <h3 className="font-14 font-bold">
                    找到<span>{songCount}</span>
                    {composeLabel}
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
