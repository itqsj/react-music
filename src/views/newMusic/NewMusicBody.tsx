import React, { useState, FC, useEffect } from 'react';

import { PlayArrowRounded } from '@mui/icons-material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import style from './css/newMusicBody.module.less';
import { SongsInt, ResNewSongsInt, StripeDataInt } from '@/types/playList';
import { topSongs } from '@/api/api_newMusic';
import Animation from '@/components/animation/Animation';
import Loading from '@/components/loading/Loading';
import StripeList from '@/components/list/stripeList/StripeList';

const NewMusicBody: FC = () => {
    const [active, setActive] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [newSongs, setNewSongs] = useState<SongsInt[]>([] as SongsInt[]);
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
            setLoading(false);
        }
    };
    useEffect(() => {
        setLoading(true);
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
                    {loading && <Loading></Loading>}
                    <StripeList data={newSongs as StripeDataInt[]}></StripeList>
                </div>
            </div>
        </Animation>
    );
};

export default NewMusicBody;
