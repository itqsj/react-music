import React, { FC, useEffect } from 'react';

import Animation from '@/components/animation/Animation';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import style from './css/collectorItem.module.less';
import { SubscribersInt } from '@/types/collector';
import { useNavigate } from 'react-router-dom';

interface PropInt {
    isPhone?: boolean;
    data: SubscribersInt;
}

const CollectorItem: FC<PropInt> = ({ data }) => {
    const navigate = useNavigate();
    const goUserDetail = () => {
        navigate(`/userDetail?id=${data.userId}`);
    };
    return (
        <div className={style.item} onClick={goUserDetail}>
            <img src={data.avatarUrl} className={style.item_avatar} alt="" />
            <div>
                <p className={style.item_name}>
                    {data.nickname}
                    {data.gender === 2 && (
                        <MaleIcon
                            sx={{
                                color: '#72c2e4',
                                marginLeft: '10px',
                            }}
                        ></MaleIcon>
                    )}
                    {data.gender === 1 && (
                        <FemaleIcon
                            sx={{
                                color: '#ea5a95',
                                marginLeft: '10px',
                            }}
                        ></FemaleIcon>
                    )}
                </p>
                <p className={style.item_sign}>{data.signature}</p>
            </div>
        </div>
    );
};

export default CollectorItem;
