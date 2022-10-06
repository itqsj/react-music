import React, { useEffect, useState } from 'react';

import Animation from '@/components/animation/Animation';
import LyricWrap from '@/components/lyricWrap/LyricWrap';
import FmPanel from './FmPanel';

import style from './css/personalFm.module.less';
import { personalFm } from '@/api/api_playlist';
import { NewSongsInt, ResNewSongsInt } from '@/types/playList';

function PersonalFm() {
    const [songs, setSongs] = useState<NewSongsInt[]>([]);
    const [currentActive, setCurrentActive] = useState<number>(0);
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
                    <div className={style.page_body_right}>
                        <LyricWrap id={songs[currentActive]?.id}></LyricWrap>
                    </div>
                </div>
            </div>
        </Animation>
    );
}

export default PersonalFm;
