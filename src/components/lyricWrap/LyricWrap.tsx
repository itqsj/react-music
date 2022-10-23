import React, { FC, useRef, useEffect, useState, useMemo } from 'react';

import style from './css/lyricWrap.module.less';
import { lyric } from '@/api/api_playlist';
import { ResLyricInt } from '@/types/playList';
import { transitionLyricArray, LyricInt } from '@/untils/filters';
import { eventBus } from '@/untils/eventBus';

interface PropsInt {
    id: number | string;
}

const LyricWrap: FC<PropsInt> = React.memo(({ id }) => {
    const ulref = useRef<HTMLUListElement>(null);
    const wrap = useRef<HTMLDivElement>(null);
    const [lyricArr, setlyricArr] = useState<LyricInt[]>([]);
    const [currentLint, setcurrentLint] = useState(0);
    let currentIndex = 0;
    let startSrollLint = 0;
    const lyrics: { current: LyricInt[] } = useRef([]) as unknown as {
        current: LyricInt[];
    };
    // let lyrics: LyricInt[] = [];

    const getlyric = async () => {
        const params = {
            id,
        };
        const res: ResLyricInt = (await lyric(params)) as ResLyricInt;
        if (res.code === 200) {
            const newLyricArr: LyricInt[] = transitionLyricArray(res.lrc.lyric);
            setlyricArr(newLyricArr);
            lyrics.current = newLyricArr;
        }
    };
    /* 歌词滚动动画 */
    const scrollAnimation = (line: number) => {
        let start: number | undefined;
        const step = (timestamp: number) => {
            if (start === undefined) start = timestamp;
            const elapsed = timestamp - start;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ulref.current.scrollTop = Math.min(
                0.16 * elapsed + (line - 1) * 40,
                line * 40,
            );
            if (elapsed < 250) {
                // 在.25秒后停止动画
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    const scroll = (time: string) => {
        const index = lyrics.current.findIndex((item, index, arr) => {
            const indexLyrics =
                index + 1 >= lyrics.current.length - 1
                    ? lyrics.current.length - 1
                    : index + 1;
            if (item.time < time && lyrics.current[indexLyrics].time > time) {
                return index;
            }
        });

        if (index === -1) {
            return false;
        }

        if (index === currentIndex) {
            return;
        }
        currentIndex = index;
        setcurrentLint(index);

        if (startSrollLint <= index) {
            scrollAnimation(index - startSrollLint + 1);
        }
    };
    useEffect(() => {
        const height = wrap.current?.offsetHeight;
        if (height) {
            startSrollLint = Math.ceil(height / 2 / 40);
        }
    }, [wrap.current]);
    useEffect(() => {
        eventBus.on('updateCurrenTime', scroll);
        return () => {
            eventBus.off('updateCurrenTime', scroll);
        };
    }, []);

    useEffect(() => {
        if (id) {
            getlyric();
        }
    }, [id]);

    return (
        <div ref={wrap} className={style.wrap}>
            <ul ref={ulref}>
                {lyricArr.map((item, index) => (
                    <li
                        key={index}
                        style={{ color: currentLint === index ? 'red' : '' }}
                    >
                        {item.lyric}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default LyricWrap;
