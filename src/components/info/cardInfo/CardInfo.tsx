import React, { FC } from 'react';

import { PlayArrowRounded } from '@mui/icons-material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Button from '@mui/material/Button';
import ImgBox from '@/components/imgBox/ImgBox';

import style from './css/cardInfo.module.less';
import { connect } from 'react-redux';
import { PlayListAndArtistAlbumsInt } from '@/types/playList';

interface PropsInt {
    module?: string;
    data: PlayListAndArtistAlbumsInt;
    isPhone: boolean;
}

const CardInfo: FC<PropsInt> = React.memo(
    ({ data, isPhone, module = 'playList' }) => {
        return (
            <div className={style.page}>
                <div className={style.page_info}>
                    <img
                        src={data?.coverImgUrl ?? data?.picUrl}
                        alt=""
                        style={{
                            filter: 'blur(10px)',
                            position: 'absolute',
                            top: '0px',
                            width: '100%',
                            // height: '100%',
                            zIndex: '-1',
                            marginLeft: '0px',
                        }}
                    />
                    <div className={style.page_info_img}>
                        <ImgBox
                            src={data?.coverImgUrl ?? data?.picUrl}
                            alt=""
                        />
                    </div>

                    <div className={style.info}>
                        <div className={style.info_title}>
                            <span className={style.info_title_icon}>
                                {module === 'playList' ? '歌单' : '专辑'}
                            </span>
                            {data?.name}
                        </div>

                        {module === 'playList' && (
                            <div className={style.info_user}>
                                <img src={data.creator?.avatarUrl} alt="" />
                                <span className={style.info_user_name}>
                                    {data?.creator?.nickname}
                                </span>
                                <span className={style.info_user_create}>
                                    {data?.createTime} 创建
                                </span>
                            </div>
                        )}

                        <div className={style.info_operation}>
                            <span
                                className={style.info_operation_item}
                                style={{
                                    backgroundColor: 'rgb(236, 65, 65)',
                                    border: '1px solid rgb(236, 65, 65)',
                                    color: 'white',
                                }}
                            >
                                <PlayArrowRounded sx={{ fontSize: '1.5rem' }} />
                                全部播放
                            </span>
                            <span className={style.info_operation_item}>
                                <AddToPhotosIcon sx={{ fontSize: '1.5rem' }} />
                                收藏（{data?.subscribedCount}）
                            </span>
                            <span className={style.info_operation_item}>
                                <ScreenShareIcon sx={{ fontSize: '1.5rem' }} />
                                分享（{data?.shareCount}）
                            </span>
                            <span className={style.info_operation_item}>
                                <CloudDownloadIcon
                                    sx={{ fontSize: '1.5rem' }}
                                />
                                下载全部
                            </span>
                        </div>

                        {module === 'album' && (
                            <div className="font-14 mtop-5">
                                <div>
                                    <span>歌手：</span>
                                    <span
                                        style={{
                                            color: '#3771dd',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {data?.artist?.name}
                                    </span>
                                </div>
                                <div className="mtop-5">
                                    <span>时间：</span>
                                    <span>{data?.publishTime}</span>
                                </div>
                            </div>
                        )}

                        {!isPhone && module === 'playList' && (
                            <div className={style.info_label}>
                                <span>
                                    标签：
                                    {data?.tags?.map((tag, index) => (
                                        <span
                                            key={index}
                                            style={{ marginLeft: '5px' }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        )}
                        {!isPhone && module === 'playList' && (
                            <div className={style.info_label}>
                                <span>歌曲：{data?.trackCount}</span>
                                <span style={{ marginLeft: '10px' }}>
                                    播放：{data?.playCount}
                                </span>
                            </div>
                        )}
                        {module === 'playList' && (
                            <div className={style.info_label}>
                                简介：{data?.description}
                            </div>
                        )}
                    </div>
                </div>
                <div className={style.page_operation}>
                    <Button>
                        <PlayArrowRounded sx={{ fontSize: '1.5rem' }} />
                        播放
                    </Button>
                    <Button>
                        <AddToPhotosIcon sx={{ fontSize: '1.5rem' }} />
                        {data?.subscribedCount}
                    </Button>
                    <Button>
                        <ScreenShareIcon sx={{ fontSize: '1.5rem' }} />
                        {data?.shareCount}
                    </Button>
                </div>
            </div>
        );
    },
);

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

export default connect(mapStateToProps)(CardInfo);
