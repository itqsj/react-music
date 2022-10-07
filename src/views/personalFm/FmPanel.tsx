import React, { FC, useState } from 'react';

import ImgBox from '@/components/imgBox/ImgBox';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import style from './css/fmPanel.module.less';
import { SongsInt } from '@/types/playList';

interface PropsInt {
    data: SongsInt;
    next: () => void;
}

const FmPanel: FC<PropsInt> = ({ data, next }) => {
    const [isPlay, setIsPlay] = useState<boolean>(false);

    const handlePanelClick = () => {
        setIsPlay(!isPlay);
    };

    return (
        <div className={style.panel}>
            <div
                style={{ position: 'relative', cursor: 'pointer' }}
                onClick={handlePanelClick}
            >
                <ImgBox src={data?.album.picUrl}></ImgBox>
                <div
                    className={[
                        style.panel_icon,
                        isPlay ? style.panel_play : style.panel_pause,
                    ].join(' ')}
                >
                    {isPlay ? (
                        <PlayArrowIcon fontSize="large"></PlayArrowIcon>
                    ) : (
                        <PauseIcon fontSize="large"></PauseIcon>
                    )}
                </div>
            </div>
            <ul className={[style.panel_operat, 'mtop-20'].join(' ')}>
                <li className="center">
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                </li>
                <li className="center">
                    <DeleteOutlineIcon></DeleteOutlineIcon>
                </li>
                <li className="center" onClick={next}>
                    <SkipNextIcon></SkipNextIcon>
                </li>
                <li className="center">
                    <MoreHorizIcon></MoreHorizIcon>
                </li>
            </ul>
        </div>
    );
};

export default FmPanel;
