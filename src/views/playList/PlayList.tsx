import React, { FC, useCallback, useLayoutEffect, useState } from 'react';

import Animation from '@/components/animation/Animation';
import Pagination from '@mui/material/Pagination';
import PlayListCard from './PlayListCard';
import CardList from '@/components/cardlist/CardList';
import TagsSelect from './TagsSelect';

import style from './css/playList.module.less';
import {
    playlistHighquality,
    topPlayList,
    playlistLabel,
} from '@/api/api_playlist';
import {
    HighqualityPlstInt,
    PlayListInt,
    ResTopPlayListInt,
    PlayListLabelInt,
    ResPlayListLabelInt,
} from '@/types/playList';
import { eventBus } from '@/untils/eventBus';

const PlayList: FC = () => {
    const [highqualityList, setHighqualityList] = useState<PlayListInt>(
        {} as PlayListInt,
    );
    const [playList, setPlayList] = useState<PlayListInt[]>(
        [] as PlayListInt[],
    );
    const [tags, setTags] = useState<PlayListLabelInt[]>(
        [] as PlayListLabelInt[],
    );
    const [tagActive, setTagActive] = useState<PlayListLabelInt>(
        {} as PlayListLabelInt,
    );
    let topPlayListOffsetParam = 0;
    const [topPlayListOffset, setTopPlayListOffset] = useState<number>(0);
    const [topPlayListPages, setTopPlayListPages] = useState<number>(1);

    const getHighquality = async () => {
        const params = {
            limit: 1,
            cat: tagActive.name,
        };
        const res: HighqualityPlstInt = (await playlistHighquality(
            params,
        )) as HighqualityPlstInt;
        if (res.code === 200) {
            setHighqualityList(res.playlists[0]);
        }
    };
    const getTopPlayList = async () => {
        const params = {
            limit: 30,
            offset: topPlayListOffsetParam * 30,
            cat: tagActive.name,
            order: 'hot',
        };
        const res: ResTopPlayListInt = (await topPlayList(
            params,
        )) as ResTopPlayListInt;
        if (res.code === 200) {
            setPlayList(res.playlists);
            setTopPlayListPages(Math.ceil(res.total / 30));
        }
    };

    const selectTag = useCallback(
        (tag: PlayListLabelInt) => {
            setTagActive(tag);
        },
        [tags],
    );
    useLayoutEffect(() => {
        if (JSON.stringify(tagActive) !== '{}') {
            getHighquality();
            getTopPlayList();
        }
    }, [tagActive]);
    const getPlaylistLabel = async () => {
        const res: ResPlayListLabelInt =
            (await playlistLabel()) as ResPlayListLabelInt;
        if (res.code === 200) {
            setTags(res.tags);
            setTagActive(res.tags[0]);
        }
    };
    const setActiveTag = (tag: PlayListLabelInt) => {
        setTagActive(tag);
    };
    const handlePaginatChange = (event: object, page: number) => {
        topPlayListOffsetParam = page - 1;
        setTopPlayListOffset(page - 1);

        getTopPlayList();
    };
    useLayoutEffect(() => {
        eventBus.on('setActiveTag', setActiveTag);
        getPlaylistLabel();
        return () => {
            eventBus.off('setActiveTag', setActiveTag);
        };
    }, []);
    return (
        <Animation>
            <div className={style.page}>
                <PlayListCard data={highqualityList}></PlayListCard>;
                <TagsSelect
                    tagActive={tagActive}
                    data={tags}
                    selectTag={selectTag}
                ></TagsSelect>
                <CardList data={playList}></CardList>
                <div
                    className={[
                        style.page_pagination,
                        'mtop-20',
                        'mbottom-10',
                    ].join(' ')}
                >
                    <Pagination
                        count={topPlayListPages}
                        page={topPlayListOffset + 1}
                        onChange={handlePaginatChange}
                        shape="rounded"
                    />
                </div>
            </div>
        </Animation>
    );
};

export default PlayList;
