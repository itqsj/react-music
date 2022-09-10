import React from 'react';

import { PlayArrowRounded } from '@mui/icons-material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Button from '@mui/material/Button';

import style from './css/playListDetInfo.module.less';
import { connect } from 'react-redux';
import { PlayListItemInt } from '@/types/playList';

interface PropsInt {
    data: PlayListItemInt;
    isPhone: boolean;
}

function SongListInfo(props: PropsInt) {
    return (
        <div className={style.page}>
            <div className={style.page_info}>
                <img
                    src={props.data.coverImgUrl}
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
                <img
                    className={style.page_info_img}
                    src={props.data.coverImgUrl}
                    alt=""
                />
                <div className={style.info}>
                    <div className={style.info_title}>
                        <span className={style.info_title_icon}>歌单</span>
                        {props.data.name}
                    </div>
                    <div className={style.info_user}>
                        <img src={props.data.creator.avatarUrl} alt="" />
                        <span className={style.info_user_name}>
                            {props.data.creator.nickname}
                        </span>
                        <span className={style.info_user_create}>
                            {props.data.createTime} 创建
                        </span>
                    </div>
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
                            收藏（{props.data.subscribedCount}）
                        </span>
                        <span className={style.info_operation_item}>
                            <ScreenShareIcon sx={{ fontSize: '1.5rem' }} />
                            分享（{props.data.shareCount}）
                        </span>
                        <span className={style.info_operation_item}>
                            <CloudDownloadIcon sx={{ fontSize: '1.5rem' }} />
                            下载全部
                        </span>
                    </div>
                    {!props.isPhone && (
                        <div className={style.info_label}>
                            <span>
                                标签：
                                {props.data.tags.map((tag, index) => (
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
                    {!props.isPhone && (
                        <div className={style.info_label}>
                            <span>歌曲：{props.data.trackCount}</span>
                            <span style={{ marginLeft: '10px' }}>
                                播放：{props.data.playCount}
                            </span>
                        </div>
                    )}
                    <div className={style.info_label}>
                        简介：{props.data.description}
                    </div>
                </div>
            </div>
            <div className={style.page_operation}>
                <Button>
                    <PlayArrowRounded sx={{ fontSize: '1.5rem' }} />
                    播放
                </Button>
                <Button>
                    <AddToPhotosIcon sx={{ fontSize: '1.5rem' }} />
                    {props.data.subscribedCount}
                </Button>
                <Button>
                    <ScreenShareIcon sx={{ fontSize: '1.5rem' }} />
                    {props.data.shareCount}
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

export default connect(mapStateToProps)(SongListInfo);
