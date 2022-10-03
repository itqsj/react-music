import React, { FC, Fragment } from 'react';

import { motion } from 'framer-motion';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import Animation from '@/components/animation/Animation';

import { connect } from 'react-redux';
import style from './css/playList.module.less';
import { TracksInt } from '@/types/playList';
import { changeSong, changePlaySongs } from '@/redux/actionCreator/PlayList';
import { ActiveInt } from '@/redux/actionCreator/PlayList';
import { PlayArrowRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getTime } from '@/untils/filters';

interface PropsInt {
    data: TracksInt[];
    isPhone: boolean;
    module?: string;
    currentSong: TracksInt;
    changeSong: (data: TracksInt) => ActiveInt;
    changePlaySongs: (data: TracksInt[]) => ActiveInt;
}

const PlayList: FC<PropsInt> = ({
    data,
    isPhone,
    module = 'songs',
    currentSong,
    changeSong,
    changePlaySongs,
}) => {
    const navigate = useNavigate();
    const handleSongClick = async (songData: TracksInt) => {
        changeSong(songData);
        if (module === 'songs') {
            changePlaySongs(data);
        }
    };

    const handleGoMv = (event: Event, data: TracksInt) => {
        event.stopPropagation();
        navigate({
            pathname: '/videoDetail',
            search: `?id=${data.mv}`,
        });
    };
    return (
        <Animation type={module === 'songs' ? 'move' : 'opacity'}>
            <Fragment>
                {!isPhone && (
                    <div className={style.page}>
                        <Table size="small" aria-label="a dense table">
                            {module === 'songs' && (
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            align="left"
                                            sx={{ paddingRight: '0' }}
                                        >
                                            序号
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left">
                                            音乐标题
                                        </TableCell>
                                        <TableCell align="left">歌手</TableCell>
                                        <TableCell
                                            align="left"
                                            className={style.page_cell}
                                        >
                                            专辑
                                        </TableCell>
                                        <TableCell align="left">时长</TableCell>
                                    </TableRow>
                                </TableHead>
                            )}
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                        onDoubleClick={() =>
                                            handleSongClick(row)
                                        }
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="left"
                                            sx={{
                                                width: '40px',
                                                paddingRight: '0',
                                                lineHeight: 'normal',
                                            }}
                                        >
                                            {currentSong.id === row.id ? (
                                                <VolumeMuteIcon
                                                    fontSize="small"
                                                    sx={{
                                                        position: 'relative',
                                                        left: '-5px',
                                                        lineHeight: 'normal',
                                                        color: '#ec4141',
                                                    }}
                                                ></VolumeMuteIcon>
                                            ) : (
                                                index + 1
                                            )}
                                        </TableCell>
                                        {module === 'songs' && (
                                            <Fragment>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    align="left"
                                                    sx={{
                                                        width: '10px',
                                                        padding: '0',
                                                    }}
                                                >
                                                    <FavoriteIcon></FavoriteIcon>
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    align="left"
                                                    sx={{
                                                        width: '10px',
                                                        padding: '0',
                                                    }}
                                                >
                                                    <FileDownloadIcon></FileDownloadIcon>
                                                </TableCell>
                                            </Fragment>
                                        )}
                                        <TableCell component="th" scope="row">
                                            <span
                                                className={[
                                                    module === 'current'
                                                        ? 'ellipsis'
                                                        : '',
                                                ].join(' ')}
                                                style={{
                                                    maxWidth:
                                                        module === 'current'
                                                            ? '200px'
                                                            : 'auto',
                                                    display: 'inline-block',
                                                    color:
                                                        currentSong.id ===
                                                        row.id
                                                            ? '#ec4141'
                                                            : 'rgba(0, 0, 0, 0.87)',
                                                }}
                                            >
                                                {row.name}
                                            </span>
                                            {row.mv !== 0 &&
                                                module === 'songs' && (
                                                    <span
                                                        className={
                                                            style.page_mv
                                                        }
                                                        onClick={() =>
                                                            handleGoMv(
                                                                event as Event,
                                                                row,
                                                            )
                                                        }
                                                    >
                                                        MV
                                                        <PlayArrowRounded
                                                            sx={{
                                                                fontSize:
                                                                    '14px',
                                                            }}
                                                        />
                                                    </span>
                                                )}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.ar.map((singer, index) => (
                                                <span key={index}>
                                                    {singer.name}
                                                </span>
                                            ))}
                                        </TableCell>
                                        {module === 'songs' && (
                                            <TableCell
                                                align="left"
                                                className={style.page_cell}
                                            >
                                                {row.al.name}
                                            </TableCell>
                                        )}
                                        <TableCell align="left">
                                            {getTime(row.dt / 1000, true)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                {isPhone && (
                    <div className={style.page}>
                        {data.map((song, index) => (
                            <div
                                className={style.song}
                                key={song.id}
                                onClick={() => handleSongClick(song)}
                            >
                                <div className={style.song_left}>
                                    <span className={style.song_left_index}>
                                        {index + 1}
                                    </span>
                                    <div className={style.song_info}>
                                        <div className={style.song_info_title}>
                                            {song.name}
                                        </div>
                                        <div className={style.song_info_singer}>
                                            {song.ar.map((singer, index) => (
                                                <span key={index}>
                                                    {singer.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className={style.song_right}>
                                    {song.mv !== 0 && (
                                        <div
                                            onClick={() =>
                                                handleGoMv(event as Event, song)
                                            }
                                        >
                                            <SlowMotionVideoIcon></SlowMotionVideoIcon>
                                        </div>
                                    )}
                                    <MoreHorizIcon
                                        sx={{ marginLeft: '5px' }}
                                    ></MoreHorizIcon>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Fragment>
        </Animation>
    );
};

const mapStateToProps = function (store: any) {
    return {
        isPhone: store.UserReducer.isPhone,
        currentSong: store.PlayListReducer.currentSong,
    };
};

const mapDispatchToProps = {
    changeSong,
    changePlaySongs,
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
