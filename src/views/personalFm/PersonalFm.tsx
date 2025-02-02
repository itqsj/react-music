import React, { useEffect, useState, FC, useRef } from 'react';

import Animation from '@/components/animation/Animation';
import LyricWrap from '@/components/lyricWrap/LyricWrap';
import FmPanel from './FmPanel';

import style from './css/personalFm.module.less';
import { personalFm } from '@/api/api_playlist';
import { SongsInt, ResNewSongsInt, TracksInt } from '@/types/playList';
import { connect } from 'react-redux';
import { changeSong } from '@/redux/actionCreator/PlayList';

interface PropsInt {
    currentSong: TracksInt;
    changeSong: (data: TracksInt, check: boolean) => void;
}

const PersonalFm: FC<PropsInt> = ({ changeSong }) => {
    const [songs, setSongs] = useState<SongsInt[]>([]);
    const [currentActive, setCurrentActive] = useState<number>(0);
    const wrap = useRef<HTMLDivElement>(null);

    const getPersonalFm = async (index: number) => {
        const res: ResNewSongsInt = (await personalFm()) as ResNewSongsInt;
        if (res.code === 200) {
            setSongs(res.data);

            setCurrentActive(index);
        }
    };
    const handleNext = () => {
        const index = songs.length - 1 > currentActive ? currentActive + 1 : 0;
        if (songs.length - 1 === currentActive) {
            getPersonalFm(0);
        } else {
            setCurrentActive(index);
        }
    };
    useEffect(() => {
        getPersonalFm(0);
    }, []);
    useEffect(() => {
        if (songs.length - 1 >= currentActive) {
            changeSong(songs[currentActive] as unknown as TracksInt, false);
        }
    }, [currentActive, songs]);

    return (
        <Animation>
            <div className={style.page}>
                <h3 className={style.page_title}>
                    {songs[currentActive]?.name}
                </h3>
                <p className="center mtop-10">
                    专辑：{songs[currentActive]?.album.name}
                </p>
                <p className="center mtop-10">
                    歌手：
                    {songs[currentActive]?.artists.map((item) => (
                        <span key={item.id}>{item.name} &nbsp;</span>
                    ))}
                </p>
                <div className={style.page_body}>
                    <div className={style.page_body_left}>
                        <FmPanel
                            data={songs[currentActive]}
                            next={handleNext}
                        ></FmPanel>
                    </div>
                    <div ref={wrap} className={style.page_body_right}>
                        <LyricWrap
                            wrap={wrap as { current: HTMLDivElement }}
                            id={songs[currentActive]?.id}
                        ></LyricWrap>
                    </div>
                </div>
            </div>
        </Animation>
    );
};

const mapStateToProps = function (store: any) {
    return {
        currentSong: store.PlayListReducer.currentSong,
    };
};

const mapDispatchToProps = {
    changeSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalFm);
