import React, { FC } from 'react';

import style from './css/playListCard.module.less';

import { PlaylistsInt } from '@/types/playList';

interface PropsInt {
    data: PlaylistsInt;
}

const PlayListCard: FC<PropsInt> = ({ data }) => {
    return (
        <div className={[style.card, 'mtop-10', 'mbottom-10'].join(' ')}>
            <img className={style.card_bg} src={data.coverImgUrl} alt="" />
            <div className={style.card_body}>
                <img src={data.coverImgUrl} alt="" />
                <div className={style.card_body_info}>
                    <span
                        className={[style.card_body_info_label, 'font-16'].join(
                            ' ',
                        )}
                    >
                        精品歌单
                    </span>
                    <p
                        className={['font-14', style.card_body_info_text].join(
                            ' ',
                        )}
                    >
                        {data.name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlayListCard;
