import React, { FC, useEffect, useState } from 'react';

import Animation from '@/components/animation/Animation';
import UserDetailInfo from './UserDetailInfo';

import style from './css/userDetail.module.less';
import { useSearchParams } from 'react-router-dom';
import { userDetail } from '@/api/api_user';
import { ResUserDetailInt, ProfileInt } from '@/types/user';

const UserDetail: FC = () => {
    const [searchParams] = useSearchParams();
    const uid: string = searchParams.get('id') as string;

    const [level, setLevel] = useState<number>(0);
    const [profile, setProfile] = useState<ProfileInt>({} as ProfileInt);

    const getUserDetail = async () => {
        const params = {
            uid,
        };
        const res: ResUserDetailInt = (await userDetail(
            params,
        )) as ResUserDetailInt;

        console.log(res);
        if (res.code === 200) {
            setLevel(res.level);
            setProfile(res.profile);
        }
    };
    useEffect(() => {
        getUserDetail();
    }, []);

    return (
        <Animation>
            <div className={style.page}>
                <UserDetailInfo level={level} data={profile}></UserDetailInfo>
            </div>
        </Animation>
    );
};

export default UserDetail;
