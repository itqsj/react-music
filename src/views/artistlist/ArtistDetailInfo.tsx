import React, { FC } from 'react';

import style from './css/artistDetailInfo.module.less';
import { ArtistInfoInt } from '@/types/artist';
import ImgBox from '@/components/imgBox/ImgBox';

interface PropsInt {
    data: ArtistInfoInt;
}

const ArtistDetailInfo: FC<PropsInt> = ({ data }) => {
    return (
        <div className={['mtop-10', 'mbottom10', style.page].join(' ')}>
            <div className={style.page_img}>
                <ImgBox src={data.cover + '?param=300y300'} alt="" />
            </div>

            <div className={['mtop-10', 'mleft-20', style.page_info].join(' ')}>
                <h3>{data.name}</h3>
                <div className={style.page_info_tag}>
                    <span>收藏</span>
                    <span>个人主页</span>
                </div>
                <div className={style.page_info_text}>
                    <span>单曲数：{data.musicSize}</span>
                    <span>专辑数：{data.albumSize}</span>
                    <span>MV数：{data.mvSize}</span>
                </div>
                {/* <div>{data.briefDesc}</div> */}
            </div>
        </div>
    );
};

export default ArtistDetailInfo;
