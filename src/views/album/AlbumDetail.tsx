import React, { FC, useEffect, useState, useCallback } from 'react';

import Animation from '@/components/animation/Animation';
import CardInfo from '@/components/info/cardInfo/CardInfo';
import NormalTabs from '@/components/tab/Tabs';
import PlayList from '@/components/list/playList/PlayList';
import Comment from '@/components/list/comment/Comment';

import { useSearchParams } from 'react-router-dom';
import { album, albumDynamic } from '@/api/api_album';
import { ResAlbumDetailInt, ResAlbumDynamicInt } from '@/types/album';
import { ArtistAlbumsInt } from '@/types/artist';
import { commentAblum } from '@/api/api_comment';
import { TracksInt, PlayListAndArtistAlbumsInt } from '@/types/playList';
import style from './css/albumDetail.module.less';
import { CommentInt, commentResInt } from '@/types/comment';

interface AlbumDescPropsInt {
    desc: string;
}

const AlbumDesc: FC<AlbumDescPropsInt> = ({ desc }) => {
    return (
        <Animation>
            <div className="font-14">
                <h3>专辑介绍</h3>
                <p
                    className="mtop-10"
                    style={{ textIndent: '2em', lineHeight: 2, width: '100%' }}
                >
                    {desc}
                </p>
            </div>
        </Animation>
    );
};

const AlbumDetail: FC = () => {
    const [search] = useSearchParams();
    const id = search.get('id') as string;
    const [songs, setSongs] = useState<TracksInt[]>([]);
    const [albumDetail, setAlbumDetail] = useState<ArtistAlbumsInt>(
        {} as ArtistAlbumsInt,
    );
    const [wonderComment, setWonderComment] = useState<CommentInt[]>([]);
    const [newComment, setNewComment] = useState<CommentInt[]>([]);
    const [tabVal, setTabVal] = useState<string>('1');
    const tabData = [
        {
            label: '歌曲列表',
            value: '1',
            children: <PlayList data={songs ?? []}></PlayList>,
        },
        {
            label: '评论',
            value: '2',
            children: (
                <Comment
                    newComment={newComment}
                    wonderComment={wonderComment}
                ></Comment>
            ),
        },
        {
            label: '专辑详情',
            value: '3',
            children: <AlbumDesc desc={albumDetail.description}></AlbumDesc>,
        },
    ];

    const getAlbum = async () => {
        const params = {
            id,
        };
        const res: ResAlbumDetailInt = (await album(
            params,
        )) as ResAlbumDetailInt;
        if (res.code === 200) {
            setSongs(res.songs);
            // setAlbumDetail();
            getAlbumDynamic(res.album);
        }
    };
    const getAlbumDynamic = async (data: ArtistAlbumsInt) => {
        const params = {
            id,
        };
        const res: ResAlbumDynamicInt = (await albumDynamic(
            params,
        )) as ResAlbumDynamicInt;
        if (res.code === 200) {
            const newData = {
                ...data,
                shareCount: res.shareCount,
                subscribedCount: res.subCount,
            };
            setAlbumDetail(newData);
        }
    };
    const getCommentAblum = async () => {
        const params = {
            id,
            limit: 20,
            offset: 0,
            before: 0,
        };
        const res: commentResInt = (await commentAblum(
            params,
        )) as commentResInt;
        if (res.code === 200) {
            setNewComment(res.comments);
            setWonderComment(res.hotComments);
        }
    };
    const handleTabChange = useCallback(
        (tabVal: string) => {
            if (tabVal === '2' && !newComment.length && !wonderComment.length) {
                getCommentAblum();
            }
            setTabVal(tabVal);
        },
        [tabData],
    );
    useEffect(() => {
        getAlbum();
    }, []);

    return (
        <Animation>
            <div className={style.page}>
                <CardInfo
                    module="album"
                    data={albumDetail as PlayListAndArtistAlbumsInt}
                ></CardInfo>
                <NormalTabs
                    tabs={tabData}
                    change={handleTabChange}
                ></NormalTabs>
            </div>
        </Animation>
    );
};

export default AlbumDetail;
