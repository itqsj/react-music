import React, { FC, useCallback } from 'react';

import Animation from '@/components/animation/Animation';
import CircleTab from '@/components/tab/CircleTab';
import NewMusicBody from './NewMusicBody';

import style from './css/newMusic.module.less';

const NewMusic: FC = () => {
    const tabData = [
        {
            label: '新歌速递',
            value: '1',
            children: <NewMusicBody></NewMusicBody>,
        },
        {
            label: '新碟上架',
            value: '2',
            children: <div>132</div>,
        },
    ];

    const handleTabChange = useCallback(
        (active: string) => {
            switch (active) {
                case '2':
                    break;
                case '3':
                    break;
            }
        },
        [tabData],
    );
    return (
        <Animation>
            <div className={style.page}>
                <CircleTab tabs={tabData} change={handleTabChange}></CircleTab>
            </div>
        </Animation>
    );
};

export default NewMusic;
