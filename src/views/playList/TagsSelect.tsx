import React, { FC, useLayoutEffect, useState } from 'react';

import Menu from '@mui/material/Menu';
import AllPlayListTag from './AllPlayListTag';

import style from './css/tagsSelect.module.less';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
    PlayListLabelInt,
    PlayListCatListInt,
    PlayListCatItemInt,
} from '@/types/playList';
import { playCatlist } from '@/api/api_playlist';

interface PropsInt {
    data: PlayListLabelInt[];
    tagActive: PlayListLabelInt;
    selectTag: (tag: PlayListLabelInt) => void;
}

const TagsSelect: FC<PropsInt> = React.memo(
    ({ tagActive, data, selectTag }) => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
            null,
        );
        const [catList, setCatList] = useState<PlayListCatItemInt[]>(
            [] as PlayListCatItemInt[],
        );
        const [catCategories, setCatCategories] = useState<Array<string>>([]);
        const [catAll, setCatAll] = useState<PlayListCatItemInt>(
            {} as PlayListCatItemInt,
        );
        const getPlayCatlist = async () => {
            const res: PlayListCatListInt =
                (await playCatlist()) as PlayListCatListInt;
            if (res.code === 200) {
                setCatList(res.sub);
                setCatCategories(Object.values(res.categories));
                setCatAll(res.all);
            }
        };
        useLayoutEffect(() => {
            getPlayCatlist();
        }, []);

        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        return (
            <div className={style.page}>
                <span
                    className={[style.page_selected, 'font-14'].join(' ')}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    {tagActive.name}
                    <ChevronRightIcon></ChevronRightIcon>
                </span>
                <div className={style.page_label}>
                    {data.map((item) => (
                        <span
                            key={item.id}
                            className={[
                                tagActive.id === item.id ? style.isActive : '',
                                'mright-10',
                            ].join(' ')}
                            onClick={() => selectTag(item)}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    sx={{
                        '& .css-6hp17o-MuiList-root-MuiMenu-list': {
                            padding: '0px',
                        },
                    }}
                >
                    <AllPlayListTag
                        catAll={catAll}
                        catCategories={catCategories}
                        catList={catList}
                        tagActive={tagActive}
                        cancel={handleClose}
                    ></AllPlayListTag>
                </Menu>
            </div>
        );
    },
);

export default TagsSelect;
