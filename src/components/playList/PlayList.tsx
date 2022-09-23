import React, { FC } from 'react';

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

import { connect } from 'react-redux';
import style from './css/playList.module.less';
import { TracksInt } from '@/types/playList';
import { changeSong } from '@/redux/actionCreator/PlayList';
import { ActiveInt } from '@/redux/actionCreator/PlayList';
import { PlayArrowRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const transition = {
    duration: 1,
    ease: [0.43, 0.13, 0.23, 0.96],
};

const imageVariants = {
    exit: { y: '25%', opacity: 0, transition },
    enter: {
        y: '0%',
        opacity: 1,
        transition,
    },
};

interface PropsInt {
    data: TracksInt[];
    isPhone: boolean;
    changeSong: (data: TracksInt) => ActiveInt;
}

const PlayList: FC<PropsInt> = (props) => {
    const navigate = useNavigate();
    const handleSongClick = async (songData: TracksInt) => {
        props.changeSong(songData);
    };

    const handleGoMv = (event: Event, data: TracksInt) => {
        event.stopPropagation();
        navigate({
            pathname: '/videoDetail',
            search: `?id=${data.mv}`,
        });
    };
    return (
        <motion.div
            className="single"
            initial="exit"
            animate="enter"
            exit="exit"
        >
            <motion.div
                style={{ overflow: 'hidden' }}
                key="modal"
                variants={imageVariants}
            >
                {!props.isPhone && (
                    <div className={style.page}>
                        <Table size="small" aria-label="a dense table">
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
                                    <TableCell align="left">音乐标题</TableCell>
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
                            <TableBody>
                                {props.data.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                        onDoubleClick={() => {
                                            handleSongClick(row);
                                        }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="left"
                                            sx={{
                                                width: '40px',
                                                paddingRight: '0',
                                            }}
                                        >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="left"
                                            sx={{ width: '10px', padding: '0' }}
                                        >
                                            <FavoriteIcon></FavoriteIcon>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="left"
                                            sx={{ width: '10px', padding: '0' }}
                                        >
                                            <FileDownloadIcon></FileDownloadIcon>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                            {row.mv !== 0 && (
                                                <span
                                                    className={style.page_mv}
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
                                                            fontSize: '14px',
                                                        }}
                                                    />
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.ar.map((singer) => (
                                                <span key={singer.id}>
                                                    {singer.name}
                                                </span>
                                            ))}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            className={style.page_cell}
                                        >
                                            {row.al.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.dt}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                {props.isPhone && (
                    <div className={style.page}>
                        {props.data.map((song, index) => (
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
                                            {song.ar.map((singer) => (
                                                <span key={singer.id}>
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
            </motion.div>
        </motion.div>
    );
};

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

const mapDispatchToProps = {
    changeSong,
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
