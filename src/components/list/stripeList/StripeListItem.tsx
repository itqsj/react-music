import React, { FC } from 'react';

import style from './css/stripeListItem.module.less';
import { StripeDataInt } from '@/types/playList';
import { useNavigate } from 'react-router-dom';

interface PropsInt {
    data: StripeDataInt;
    index: number;
    module?: string;
}

const NewMusicItem: FC<PropsInt> = React.memo(
    ({ data, index, module = 'music' }) => {
        const navigate = useNavigate();
        const handleClick = () => {
            if (module === 'album') {
                navigate(`/albumDetail?id=${data.id}`);
            }
            if (module === 'singer') {
                navigate(`/artistDetail?id=${data.id}`);
            }
            if (module === 'playlist') {
                navigate(`/playlistDetail?id=${data.id}`);
            }
            if (module === 'users') {
                navigate(`/userDetail?id=${data.userId}`);
            }
        };
        return (
            <div
                className={[style.item, 'font-14'].join(' ')}
                style={{
                    background: index % 2 === 1 ? '#f9f9f9' : '',
                }}
                onClick={handleClick}
            >
                <div className={[style.item_index].join(' ')}>{index + 1}</div>
                <div className={style.item_img}>
                    <img
                        src={
                            (data.album?.picUrl ??
                                data.picUrl ??
                                data.coverImgUrl ??
                                data.backgroundUrl) + '?param=100y100'
                        }
                        alt=""
                    />
                </div>
                <div
                    className={[style.item_name, 'ellipsis', 'mleft-10'].join(
                        ' ',
                    )}
                >
                    {data.name ?? data.nickname}
                </div>
                {(module === 'music' || module === 'album') && (
                    <div
                        className={[
                            style.item_info,
                            'ellipsis',
                            'font-12',
                        ].join(' ')}
                    >
                        {data.artists.map((item) => (
                            <span key={item.id}>{item.name}</span>
                        ))}
                    </div>
                )}
                {module === 'music' && (
                    <div
                        className={[
                            style.item_info,
                            'ellipsis',
                            'font-12',
                        ].join(' ')}
                    >
                        {data.album.name}
                    </div>
                )}
                {module === 'playlist' && (
                    <div
                        className={[
                            style.item_info,
                            'font-12',
                            'ellipsis',
                        ].join(' ')}
                    >
                        {data.trackCount}首
                    </div>
                )}
                {module === 'playlist' && (
                    <div
                        className={[
                            style.item_info,
                            'font-12',
                            'ellipsis',
                        ].join(' ')}
                    >
                        by {data.creator.nickname}
                    </div>
                )}
                {module === 'music' && (
                    <div
                        className={[
                            'font-12',
                            style.item_time,
                            'ellipsis',
                        ].join(' ')}
                    >
                        {data.duration}
                    </div>
                )}
            </div>
        );
    },
);

export default NewMusicItem;
