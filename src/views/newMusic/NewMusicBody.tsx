import React, { useState, FC, useEffect } from 'react';

import { PlayArrowRounded } from '@mui/icons-material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import NewMusicItem from './NewMusicItem';

import style from './css/newMusicBody.module.less';
import { NewSongsInt, ResNewSongsInt } from '@/types/newMusic';
import { topSongs } from '@/api/api_newMusic';
import Animation from '@/components/animation/Animation';

const NewMusicBody: FC = () => {
    const [active, setActive] = useState<number>(0);
    const [newSongs, setNewSongs] = useState<NewSongsInt[]>(
        [] as NewSongsInt[],
    );
    const tabList = [
        {
            label: '全部',
            value: 0,
        },
        {
            label: '华语',
            value: 7,
        },
        {
            label: '欧美',
            value: 96,
        },
        {
            label: '日本',
            value: 8,
        },
        {
            label: '韩国',
            value: 16,
        },
    ];
    const getTopSongs = async () => {
        const params = {
            type: active,
        };
        const res: ResNewSongsInt = (await topSongs(params)) as ResNewSongsInt;
        if (res.code === 200) {
            setNewSongs(res.data);
        }
    };
    useEffect(() => {
        getTopSongs();
    }, [active]);
    return (
        <Animation>
            <div className={style.page}>
                <div className={style.page_operat}>
                    <ul>
                        {tabList.map((item) => (
                            <li
                                key={item.value}
                                className={[
                                    'font-16',
                                    'mleft-20',
                                    active === item.value
                                        ? style.is_active
                                        : '',
                                ].join(' ')}
                                onClick={() => setActive(item.value)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                    <div>
                        <span
                            className={style.page_operat_item}
                            style={{
                                backgroundColor: 'rgb(236, 65, 65)',
                                border: '1px solid rgb(236, 65, 65)',
                                color: 'white',
                            }}
                        >
                            <PlayArrowRounded sx={{ fontSize: '1.5rem' }} />
                            全部播放
                        </span>
                        <span className={style.page_operat_item}>
                            <AddToPhotosIcon sx={{ fontSize: '1.5rem' }} />
                            收藏
                        </span>
                    </div>
                </div>
                <div className={style.page_body}>
                    {newSongs.map((item, index) => (
                        <NewMusicItem
                            data={item}
                            key={item.id}
                            index={index}
                        ></NewMusicItem>
                    ))}
                </div>
            </div>
        </Animation>
    );
};

export default NewMusicBody;
