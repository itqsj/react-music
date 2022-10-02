import React, { FC, useEffect, useRef, useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Animation from '@/components/animation/Animation';
import RecomViode from './RecomViode';
import Comment from '@/components/list/comment/Comment';
import VideoDetailInfo from '@/views/video/videoDetail/VideoDetailInfo';

import style from './css/videoDetail.module.less';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Player from 'xgplayer';
import { detailMv, infoMv, mvOperatData } from '@/api/api_video';
import { commentMv } from '@/api/api_comment';
import {
    ResMvDetailInt,
    MvDetailInt,
    ResMvInfoInt,
    MvInfoInt,
    ResMvOperatInt,
} from '@/types/video';
import { commentResInt, CommentInt } from '@/types/comment';

const videoDetail: FC = () => {
    const [search] = useSearchParams();
    const id: string = search.get('id') as string;
    const navigate = useNavigate();
    const videoRef = useRef<HTMLDivElement>(null);
    const [player, setPlayer] = useState<Player>();
    const [playInfo, setPlayInfo] = useState<MvDetailInt>({} as MvDetailInt);
    const [wonderComment, setWonderComment] = useState<CommentInt[]>([]);
    const [newComment, setNewComment] = useState<CommentInt[]>([]);
    const [mvInfo, setMvInfo] = useState<MvInfoInt>({} as MvInfoInt);
    const [mvOperationData, setMvOperationData] = useState<ResMvOperatInt>(
        {} as ResMvOperatInt,
    );

    useEffect(() => {
        getDetailMv();
        getCommentMv();
        getInfoMv();
        getMvOperatData();
    }, [search.get('id')]);
    const getMvOperatData = async () => {
        const params = {
            mvid: id,
        };
        const res: ResMvOperatInt = (await mvOperatData(
            params,
        )) as ResMvOperatInt;
        if (res.code === 200) {
            setMvOperationData(res);
        }
    };
    const getCommentMv = async () => {
        const res: commentResInt = (await commentMv(id)) as commentResInt;
        if (res.code === 200) {
            setWonderComment(res.hotComments);
            setNewComment(res.comments);
        }
    };
    const getInfoMv = async () => {
        const params = {
            mvid: id,
        };
        const res: ResMvInfoInt = (await infoMv(params)) as ResMvInfoInt;
        if (res.code === 200) {
            setMvInfo(res.data);
        }
    };
    const getDetailMv = async () => {
        const params = {
            id,
        };
        const res: ResMvDetailInt = (await detailMv(params)) as ResMvDetailInt;
        if (res.code === 200) {
            setPlayInfo(res.data);

            if (player) {
                player.src = res.data.url;
            } else {
                initPlayAndEvent(res.data.url);
            }
        }
    };
    const initPlayAndEvent = (url: string) => {
        const playerObj = new Player({
            el: videoRef.current as HTMLElement,
            autoplay: true,
            volume: 0.5,
            lang: 'zh-cn',
            ignores: ['volume', 'loading', 'play', 'rotate'],
            // 'x5-video-player-type': 'h5', // 微信同层播放
            url,
            // poster: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fnote%2Fl%2Fpublic%2Fp86225918.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664872461&t=19624bde5080a968c3a7f2fcad06f509',
            playsinline: true,
            // fitVideoSize: 'fixWidth',
            errorTips: `视频加载失败了，<span class="xgplayer-error-refresh" style="color: #c6000c">点击刷新</span>`,
            // errorTips: `视频加载失败了，<span id=video-` + this.eleId + ` style="color: #c6000c">点击刷新</span>`,
            playbackRate: [0.5, 0.75, 1, 1.5, 2],
            // rotate: { // 视频旋转按钮配置项, 需开启rotate 按钮 否则回报错
            //   innerRotate: false, // 只旋转内部video
            //   clockwise: false // 旋转方向是否为顺时针
            // },
            height: 'auto',
            width: '100%',
        });
        setPlayer(playerObj);
    };
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <Animation>
            <div className={style.page}>
                <div
                    className={[
                        style.page_bread,
                        'font-16',
                        'font-bold',
                        'mtop-10',
                    ].join(' ')}
                    onClick={handleBack}
                >
                    <ArrowBackIosNewIcon
                        className="mright-5 mleft-5"
                        sx={{
                            width: '17px',
                            cursor: 'pointer',
                        }}
                    ></ArrowBackIosNewIcon>
                    MV详情
                </div>
                <div className={style.page_body}>
                    <div className={style.page_body_left}>
                        <div
                            ref={videoRef}
                            className={[
                                style.page_body_left_player,
                                'mbottom-10',
                            ].join(' ')}
                            style={{ height: '100%' }}
                        ></div>
                        <VideoDetailInfo
                            info={mvOperationData}
                            data={mvInfo}
                        ></VideoDetailInfo>
                        <h3 className="mtop-10 mbottom-10 font-20">
                            评论
                            <span className="font-14 font-normal">
                                ({mvInfo.commentCount})
                            </span>
                        </h3>
                        <Comment
                            newComment={newComment}
                            wonderComment={wonderComment}
                        ></Comment>
                    </div>
                    <div
                        className={[style.page_body_right, 'ptop-10'].join(' ')}
                    >
                        <RecomViode></RecomViode>
                    </div>
                </div>
            </div>
        </Animation>
    );
};

export default videoDetail;
