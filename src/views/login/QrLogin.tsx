import React, { FC, useEffect, useState } from 'react';

import ImgBox from '@/components/imgBox/ImgBox';

import { qrKey, qrCreate, qrCheck } from '@/api/api_user';
import { ResQrKeyInt, ResQrCreateInt, ResQrStatusInt } from '@/types/user';
import style from './css/qrLogin.module.less';
import { useNavigate } from 'react-router-dom';

const QrLogin: FC = () => {
    let unikey = '';
    let timer: string | number | NodeJS.Timeout | null | undefined = null;
    const [Qr, setQr] = useState<string>('');
    const [QrUrl, setQrUrl] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const navigate = useNavigate();

    const getQrKey = async () => {
        const res: ResQrKeyInt = (await qrKey()) as ResQrKeyInt;
        if (res.code === 200) {
            unikey = res.data.unikey;
            getQrCreate();
        }
    };

    const getQrCreate = async () => {
        const params = {
            qrimg: true,
            key: unikey,
        };
        const res: ResQrCreateInt = (await qrCreate(params)) as ResQrCreateInt;

        if (res.code === 200) {
            setQr(res.data.qrimg);
            setQrUrl(res.data.qrurl);
            timer = setTimeout(() => {
                getQrCheck();
            }, 5000);
        }
    };
    /* 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies) */
    /* 检查二维码状态 */
    const getQrCheck = async () => {
        const params = {
            key: unikey,
        };
        const res: ResQrStatusInt = (await qrCheck(params)) as ResQrStatusInt;
        setStatus(res.message);
        if (res.code === 801 || res.code === 802) {
            timer = setTimeout(() => {
                getQrCheck();
            }, 5000);
        } else if (res.code === 803) {
            navigate('/home');
        }
    };
    useEffect(() => {
        getQrKey();
        return () => {
            clearTimeout(timer as NodeJS.Timeout);
            timer = null;
        };
    }, []);

    return (
        <div className={style.page}>
            <div className={style.page_img}>
                <ImgBox src={Qr}></ImgBox>
            </div>
            <p className={[style.page_status, 'mtop-20'].join(' ')}>
                状态：{status ? status : '等待扫码'}
            </p>
        </div>
    );
};

export default QrLogin;
