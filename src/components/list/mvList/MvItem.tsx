import React, { FC } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import style from './css/mvItem.module.less';
import { ArtistMvInt } from '@/types/artist';
import { useNavigate } from 'react-router-dom';
import ImgBox from '../imgBox/ImgBox';

interface PropsInt {
    data: ArtistMvInt;
}

const MvItem: FC<PropsInt> = ({ data }) => {
    const navigate = useNavigate();
    const goMVDetail = () => {
        navigate(`/videoDetail?id=${data.id}`);
    };
    return (
        <div className={style.item} onClick={goMVDetail}>
            <div className={style.item_img}>
                <ImgBox
                    src={data.imgurl + '?param=320y180'}
                    alt=""
                    aspectRatio="9/5"
                />
            </div>
            <div className={[style.item_count, 'font-12'].join(' ')}>
                <PlayArrowIcon
                    sx={{
                        fontSize: '20px',
                        color: '#ffff',
                    }}
                ></PlayArrowIcon>
                {data.playCount}
            </div>
            <div className={style.item_play}>
                <PlayArrowIcon
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
    );
};

export default MvItem;
