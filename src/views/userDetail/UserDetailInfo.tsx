import ImgBox from '@/components/imgBox/ImgBox';
import React, { FC } from 'react';

import style from './css/userDetailInfo.module.less';
import { ProfileInt } from '@/types/user';

interface PropInt {
    level: number;
    data: ProfileInt;
}

const UserDetailInfo: FC<PropInt> = ({ level, data }) => {
    return (
        <div className={[style.item, 'mtop-20'].join(' ')}>
            <div className={style.item_img}>
                <ImgBox src={data.avatarUrl}></ImgBox>
            </div>
            <div className={[style.item_info, 'mleft-20'].join(' ')}>
                <h3 className="font-24 font-bold">{data.nickname}</h3>
                <div className={style.item_info_label}>
                    <div
                        className={[style.item_info_label_level, 'tag'].join(
                            ' ',
                        )}
                    >
                        Lv{level}
                    </div>
                    <div className={style.operation}>
                        <span>发私信</span>
                        <span className="mleft-20">关注</span>
                    </div>
                </div>
                <ul className={[style.item_info_param, 'mtop-10'].join(' ')}>
                    <li>
                        <p className="font-20 font-bold">{data.eventCount}</p>
                        <p className="mtop-5">动态</p>
                    </li>
                    <li>
                        <p className="font-20 font-bold">{data.follows}</p>
                        <p className="mtop-5">关注</p>
                    </li>
                    <li>
                        <p className="font-20 font-bold ">{data.followeds}</p>
                        <p className="mtop-5">粉丝</p>
                    </li>
                </ul>
                <p className="mtop-10 font-14">所在区域：广西南宁横县</p>
                <p className="mtop-10 font-14">个人介绍：{data.signature}</p>
            </div>
        </div>
    );
};

export default UserDetailInfo;
