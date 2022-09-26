import React, { FC } from 'react';

import style from './css/hot.module.less';

const HotSearch: FC = () => {
    return (
        <div className={style.panel}>
            <p className={[style.panel_text, 'font-14', 'mtop-20'].join(' ')}>
                热搜榜
            </p>
            <ul className={style.panel_list}>
                <li>
                    <p
                        className={[
                            style.panel_list_index,
                            'font-14',
                            'mleft-10',
                        ].join(' ')}
                    >
                        1
                    </p>
                    <div
                        className={[style.panel_list_liinfo, 'font-14'].join(
                            ' ',
                        )}
                    >
                        <div>
                            <span className="font-bold">林俊杰</span>
                            <span className="font-12 mleft-10 color-3">
                                123456
                            </span>
                        </div>
                        <p className="color-5" style={{ marginTop: '3px' }}>
                            大部分在撒旦
                        </p>
                    </div>
                </li>
                <li>
                    <p
                        className={[
                            style.panel_list_index,
                            'font-14',
                            'mleft-10',
                        ].join(' ')}
                    >
                        1
                    </p>
                    <div
                        className={[style.panel_list_liinfo, 'font-14'].join(
                            ' ',
                        )}
                    >
                        <div>
                            <span className="font-bold">林俊杰</span>
                            <span className="font-12 mleft-10 color-3">
                                123456
                            </span>
                        </div>
                        <p className="color-5" style={{ marginTop: '3px' }}>
                            大部分在撒旦
                        </p>
                    </div>
                </li>
                <li>
                    <p
                        className={[
                            style.panel_list_index,
                            'font-14',
                            'mleft-10',
                        ].join(' ')}
                    >
                        1
                    </p>
                    <div
                        className={[style.panel_list_liinfo, 'font-14'].join(
                            ' ',
                        )}
                    >
                        <div>
                            <span className="font-bold">林俊杰</span>
                            <span className="font-12 mleft-10 color-3">
                                123456
                            </span>
                        </div>
                        <p className="color-5" style={{ marginTop: '3px' }}>
                            大部分在撒旦
                        </p>
                    </div>
                </li>
                <li>
                    <p
                        className={[
                            style.panel_list_index,
                            'font-14',
                            'mleft-10',
                        ].join(' ')}
                    >
                        1
                    </p>
                    <div
                        className={[style.panel_list_liinfo, 'font-14'].join(
                            ' ',
                        )}
                    >
                        <div>
                            <span className="font-bold">林俊杰</span>
                            <span className="font-12 mleft-10 color-3">
                                123456
                            </span>
                        </div>
                        <p className="color-5" style={{ marginTop: '3px' }}>
                            大部分在撒旦
                        </p>
                    </div>
                </li>
                <li>
                    <p
                        className={[
                            style.panel_list_index,
                            'font-14',
                            'mleft-10',
                        ].join(' ')}
                    >
                        1
                    </p>
                    <div
                        className={[style.panel_list_liinfo, 'font-14'].join(
                            ' ',
                        )}
                    >
                        <div>
                            <span className="font-bold">林俊杰</span>
                            <span className="font-12 mleft-10 color-3">
                                123456
                            </span>
                        </div>
                        <p className="color-5" style={{ marginTop: '3px' }}>
                            大部分在撒旦
                        </p>
                    </div>
                </li>
                <li>
                    <p
                        className={[
                            style.panel_list_index,
                            'font-14',
                            'mleft-10',
                        ].join(' ')}
                    >
                        1
                    </p>
                    <div
                        className={[style.panel_list_liinfo, 'font-14'].join(
                            ' ',
                        )}
                    >
                        <div>
                            <span className="font-bold">林俊杰</span>
                            <span className="font-12 mleft-10 color-3">
                                123456
                            </span>
                        </div>
                        <p className="color-5" style={{ marginTop: '3px' }}>
                            大部分在撒旦
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default HotSearch;
