import React, { FC, useState, useEffect } from 'react';

import style from './css/imgBox.module.less';

interface PropsInt {
    src: string;
    alt?: string;
    type?: string;
    aspectRatio?: string;
}

const ImgBox: FC<PropsInt> = React.memo(
    ({ src, alt, type = 'loada', aspectRatio = '1/1' }) => {
        const [loading, setLoading] = useState<boolean>(true);
        const [imgSrc, setImgSrc] = useState<string>('');

        const handleLoad = () => {
            setLoading(false);
        };
        useEffect(() => {
            setImgSrc(src);
            setLoading(true);
        }, [src]);
        return (
            <div
                className={style.box}
                style={{
                    aspectRatio,
                }}
            >
                <img
                    style={{
                        opacity: loading ? '0' : '1',
                        aspectRatio,
                    }}
                    className={style.box_img}
                    src={imgSrc}
                    onLoad={handleLoad}
                    alt={alt}
                />
                {type === 'move_load' && (
                    <div
                        className={style.box_move_loader}
                        style={{
                            opacity: loading ? '1' : '0',
                        }}
                    ></div>
                )}
                {type === 'loada' && (
                    <div
                        className={style.box_load}
                        style={{
                            opacity: loading ? '1' : '0',
                        }}
                    >
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                    </div>
                )}
                {type === 'loadb' && (
                    <div
                        className={style.box_loadb}
                        style={{
                            opacity: loading ? '1' : '0',
                        }}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                )}
            </div>
        );
    },
);

export default ImgBox;
