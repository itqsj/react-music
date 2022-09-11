import React, { FC, useLayoutEffect, useState } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import style from './css/officialTopItem.module.less';
import {
    PlayListInt,
    PlayListDetailInt,
    PlayListItemInt,
    TracksInt,
} from '@/types/playList';
import { playListDetail } from '@/api/api_playlist';
import { useNavigate } from 'react-router-dom';

interface PropsInt {
    data: PlayListInt;
}

const OfficialTopItem: FC<PropsInt> = React.memo(({ data }) => {
    const navigate = useNavigate();
    const [playDetail, setPlayDetail] = useState<PlayListItemInt>(
        {} as PlayListItemInt,
    );
    const getPlayListDetail = async () => {
        const res: PlayListDetailInt = (await playListDetail({
            id: data.id,
        })) as PlayListDetailInt;
        if (res.code === 200) {
            setPlayDetail(res.playlist as PlayListItemInt);
        }
    };

    const goPlayListDetail = () => {
        navigate(`/playListDetail?id=${data.id}`);
    };
    useLayoutEffect(() => {
        getPlayListDetail();
    }, []);
    return (
        <div className={['mtop-10', 'mbottom-20', style.item].join(' ')}>
            <div
                className={[style.item_img, 'mright-20'].join(' ')}
                onClick={goPlayListDetail}
            >
                <img src={data.coverImgUrl} alt="" />
                <div className={style.item_img_play}>
                    <PlayArrowIcon
                        className={style.item_img_play_icon}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            fontSize: '30px',
                            color: '#ec4141',
                        }}
                    ></PlayArrowIcon>
                </div>
            </div>
            <ul className={['sont-14', style.item_list].join(' ')}>
                {playDetail.tracks?.length &&
                    playDetail.tracks
                        .filter((item, index) => index < 5)
                        .map((item: TracksInt, index) => (
                            <li key={item.id}>
                                <div>
                                    <span
                                        className="mleft-10 mright-10"
                                        style={{
                                            color: index < 3 ? 'red' : '',
                                        }}
                                    >
                                        {index + 1}
                                    </span>
                                    {item.name}
                                </div>
                                <div className="pright-10">
                                    {item.ar.length &&
                                        item.ar.map((itemAr) => (
                                            <span key={itemAr.id}>
                                                {itemAr.name}
                                            </span>
                                        ))}
                                </div>
                            </li>
                        ))}
                <div
                    className={['mleft-10', style.item_list_all].join(' ')}
                    onClick={goPlayListDetail}
                >
                    查看全部
                    <ChevronRightIcon
                        sx={{
                            fontSize: '18px',
                            marginLeft: '1px',
                        }}
                    ></ChevronRightIcon>
                </div>
            </ul>
        </div>
    );
});

export default OfficialTopItem;
