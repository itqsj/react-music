import React, { FC, useEffect, useState } from 'react';

import Animation from '@/components/animation/Animation';
import UserDetailInfo from './UserDetailInfo';

import style from './css/userDetail.module.less';
import { useSearchParams } from 'react-router-dom';
import { userDetail } from '@/api/api_user';
import { ResUserDetailInt, ProfileInt, ResUserPlaylistInt } from '@/types/user';
import { userPlaylist } from '@/api/api_playlist';
import { PlayListInt } from '@/types/playList';
import NormalTabs from '@/components/tab/Tabs';
import CardList from '@/components/cardlist/CardList';

const UserDetail: FC = () => {
    const [searchParams] = useSearchParams();
    const uid = searchParams.get('id') as string | number;

    const [level, setLevel] = useState<number>(0);
    const [profile, setProfile] = useState<ProfileInt>({} as ProfileInt);
    const [myPlaylist, setMyPlaylist] = useState<PlayListInt[]>(
        [] as PlayListInt[],
    );
    const [collcetPlaylist, setCollcetPlaylist] = useState<PlayListInt[]>(
        [] as PlayListInt[],
    );
    let collectPlaylist: Array<PlayListInt> = [];

    const tabData = [
        {
            label: '创建的歌单',
            value: '1',
            children: <CardList data={myPlaylist}></CardList>,
        },
        {
            label: '收藏的歌单',
            value: '2',
            children: <CardList data={collcetPlaylist}></CardList>,
        },
    ];

    const getUserDetail = async () => {
        const params = {
            uid,
        };
        const res: ResUserDetailInt = (await userDetail(
            params,
        )) as ResUserDetailInt;

        if (res.code === 200) {
            setLevel(res.level);
            setProfile(res.profile);
        }
    };
    const getPlayList = async (offset: number) => {
        const params = {
            uid,
            limit: 30,
            offset,
        };
        const res: ResUserPlaylistInt = (await userPlaylist(
            params,
        )) as ResUserPlaylistInt;

        if (res.code === 200) {
            collectPlaylist = [...collectPlaylist, ...res.playlist];

            if (res.more) {
                getPlayList(offset + 30);
            } else {
                classifyPlaylist();
            }
        }
    };
    const classifyPlaylist = () => {
        const mylist = collectPlaylist.filter(
            (item) => `${item.creator.userId}` === uid,
        );
        setMyPlaylist(mylist);
        const collectlist = collectPlaylist.filter(
            (item) => `${item.creator.userId}` !== uid,
        );
        setCollcetPlaylist(collectlist);
    };
    useEffect(() => {
        getUserDetail();
        getPlayList(0);
    }, []);

    return (
        <Animation>
            <div className={style.page}>
                <UserDetailInfo level={level} data={profile}></UserDetailInfo>
                <div className="mtop-20 mleft-20 mright-20">
                    <NormalTabs tabs={tabData}></NormalTabs>
                </div>
            </div>
        </Animation>
    );
};

export default UserDetail;
