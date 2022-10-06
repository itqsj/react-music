import React, { useEffect, useState } from 'react';
import { songLyric } from '@/api/api_playlist';
import { transitionLyricArray, LyricInt } from '@/untils/filters';
import style from './css/songLyric.module.less';
import LyricWrap from '@/components/lyricWrap/LyricWrap';

interface SongLyricInt {
    id: number | string;
}

interface LyricRes {
    code: number;
    klyric: object;
    lrc: LrcInt;
    qfy: boolean;
    sfy: boolean;
    sgc: boolean;
}
interface LrcInt {
    lyric: string;
}

function SongLyric({ id }: SongLyricInt) {
    // const [lyricList, setLyricList] = useState<Array<LyricInt>>(
    //     [] as Array<LyricInt>,
    // );
    // const getSongLyric = async () => {
    //     const params: SongLyricInt = {
    //         id,
    //     };
    //     const res: LyricRes = (await songLyric(params)) as LyricRes;
    //     if (res.code === 200) {
    //         setLyricList(transitionLyricArray(res.lrc.lyric));
    //     }
    // };
    useEffect(() => {
        // getSongLyric();
    }, []);
    return (
        <div className={style.page}>
            <LyricWrap id={id}></LyricWrap>
        </div>
    );
}

export default SongLyric;
