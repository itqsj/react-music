import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { RecomVideoInt } from '@/types/video';
import style from './css/recomViodeItem.module.less';
import ImgBox from '@/components/imgBox/ImgBox';
interface PropsInt {
    data: RecomVideoInt;
}

const RecomViodeItem: FC<PropsInt> = React.memo(({ data }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/videoDetail?id=${data.id}`);
    };
    return (
        <div
            className={[style.item, 'mbottom-5'].join(' ')}
            onClick={handleClick}
        >
            <div className={style.item_left}>
                <ImgBox aspectRatio="7/4" src={data.picUrl} alt="" />
            </div>
            <div className={[style.item_right, 'mleft-10'].join(' ')}>
                <p className="font-14 font-bold">{data.name}</p>
                <p className="font-12 mtop-10">by &nbsp;{data.artistName}</p>
            </div>
        </div>
    );
});

export default RecomViodeItem;
