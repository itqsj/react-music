import React, { FC } from 'react';

import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import style from './css/videoDetailInfo.module.less';
import { MvInfoInt, ResMvOperatInt } from '@/types/video';

interface PropsInt {
    data: MvInfoInt;
    info: ResMvOperatInt;
}

const videoDetailInfo: FC<PropsInt> = ({ data, info }) => {
    return (
        <div className={[style.info, 'ptop-10', 'mbottom-10'].join(' ')}>
            <div className={style.info_head}>
                <img className={style.info_head_avar} src={data.cover} alt="" />
                <span className={style.info_head_name}>{data.artistName}</span>
            </div>
            <h3 className="font-18 font-bold mtop-10">{data.name}</h3>
            <div className={[style.info_body, 'font-12', 'mtop-10'].join(' ')}>
                <span>发布时间:{data.publishTime}</span>
                <span className="mleft-10">
                    播放次数:
                    {data.playCount > 10000
                        ? Math.floor(data.playCount / 10000)
                        : data.playCount / 10000}
                    万
                </span>
            </div>
            <div
                className={[style.info_label, 'mtop-10', 'mbottom-10'].join(
                    ' ',
                )}
            >
                {data.videoGroup?.map((item) => (
                    <span className="font-12 " key={item.id}>
                        {item.name}
                    </span>
                ))}
            </div>
            <div className={[style.info_operat, 'mtop-10'].join(' ')}>
                <span
                    className={[style.info_operat_item, 'mright-10'].join(' ')}
                >
                    <ThumbUpAltIcon sx={{ fontSize: '1rem' }} />
                    <span className="mleft-5">赞{info.likedCount}</span>
                </span>
                <span
                    className={[style.info_operat_item, 'mright-10'].join(' ')}
                >
                    <AddToPhotosIcon sx={{ fontSize: '1rem' }} />
                    <span className="mleft-5">收藏{data.subCount}</span>
                </span>
                <span
                    className={[style.info_operat_item, 'mright-10'].join(' ')}
                >
                    <ScreenShareIcon sx={{ fontSize: '1rem' }} />
                    <span className="mleft-5">分享{info.shareCount}</span>
                </span>
            </div>
        </div>
    );
};

export default videoDetailInfo;
