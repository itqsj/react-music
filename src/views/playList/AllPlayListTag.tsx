import React, { useCallback, useMemo, FC } from 'react';

import LanguageIcon from '@mui/icons-material/Language';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import DiscountIcon from '@mui/icons-material/Discount';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

import style from './css/AllPlayListTag.module.less';
import { PlayListCatItemInt, PlayListLabelInt } from '@/types/playList';
import { eventBus } from '@/untils/eventBus';

interface PropsInt {
    catAll: PlayListCatItemInt;
    catCategories: Array<string>;
    catList: PlayListCatItemInt[];
    tagActive: PlayListLabelInt;
    cancel: () => void;
}

const allPlayListTag: FC<PropsInt> = React.memo(
    ({ catAll, catCategories, catList, tagActive, cancel }) => {
        const handleTagClick = (tag: PlayListCatItemInt) => {
            eventBus.emit('setActiveTag', tag);
            cancel();
        };
        const composeIcon = useCallback((cate: number) => {
            switch (cate) {
                case 0:
                    return <LanguageIcon></LanguageIcon>;
                case 1:
                    return <FreeBreakfastIcon></FreeBreakfastIcon>;
                case 2:
                    return <DiscountIcon></DiscountIcon>;
                case 3:
                    return (
                        <SentimentSatisfiedAltIcon></SentimentSatisfiedAltIcon>
                    );
                case 4:
                    return <AutoAwesomeMosaicIcon></AutoAwesomeMosaicIcon>;
            }
        }, []);
        return (
            <div className={style.page}>
                <div className={['h-60', style.page_head, 'font-14'].join(' ')}>
                    {catAll.name}
                </div>
                <div className={style.page_body}>
                    {useMemo(
                        () =>
                            catCategories.map((item, index: number) => (
                                <div className={style.item} key={index}>
                                    <div
                                        className={[
                                            style.item_title,
                                            'font-14',
                                        ].join(' ')}
                                    >
                                        {composeIcon(index)}
                                        <span className="mleft-10">{item}</span>
                                    </div>
                                    <ul className={style.item_ul}>
                                        {catList
                                            .filter(
                                                (item) =>
                                                    item.category === index,
                                            )
                                            .map((cat) => (
                                                <li
                                                    className="font-12"
                                                    key={cat.name}
                                                >
                                                    <span
                                                        onClick={() =>
                                                            handleTagClick(cat)
                                                        }
                                                        className={
                                                            tagActive.name ===
                                                            cat.name
                                                                ? style.is_active
                                                                : ''
                                                        }
                                                    >
                                                        {cat.name}
                                                    </span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )),
                        [catCategories],
                    )}
                </div>
            </div>
        );
    },
);

export default allPlayListTag;
