import React, { FC, useEffect, useState } from 'react';

import style from './css/hot.module.less';
import { searchHot } from '@/api/api_search';
import { ResSearchHotInt, SearchHotInt } from '@/types/search';
import { eventBus } from '@/untils/eventBus';

const HotSearch: FC = () => {
    const [hotlist, sethotlist] = useState<SearchHotInt[]>([]);
    const getSearchHot = async () => {
        const res: ResSearchHotInt = (await searchHot()) as ResSearchHotInt;
        if (res.code === 200) {
            sethotlist(res.data);
        }
    };
    const handleSearch = (data: SearchHotInt) => {
        eventBus.emit('search', data.searchWord);
    };
    useEffect(() => {
        getSearchHot();
    }, []);

    return (
        <div className={style.panel}>
            <p className={[style.panel_text, 'font-14', 'mtop-20'].join(' ')}>
                热搜榜
            </p>
            <ul className={style.panel_list}>
                {hotlist.map((item, index) => (
                    <li key={index} onClick={() => handleSearch(item)}>
                        <p
                            className={[
                                style.panel_list_index,
                                'font-14',
                                'mleft-10',
                            ].join(' ')}
                        >
                            {index + 1}
                        </p>
                        <div
                            className={[
                                style.panel_list_liinfo,
                                'font-14',
                            ].join(' ')}
                        >
                            <div>
                                <span className="font-bold">
                                    {item.searchWord}
                                </span>
                                <span className="font-12 mleft-10 color-3">
                                    {item.score}
                                </span>
                            </div>
                            {item.content && (
                                <p
                                    className="color-5"
                                    style={{ marginTop: '3px' }}
                                >
                                    {item.content}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotSearch;
