import React, { useEffect, useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';
import { eventBus } from '@/untils/eventBus';

interface LinkTabProps {
    label?: string;
    href: string;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            sx={{
                fontSize: '14px',
                height: '60px',
            }}
            component="span"
            {...props}
        />
    );
}

function RouterTab() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const tabData: LinkTabProps[] = [
        {
            label: '个性推荐',
            href: 'personalRecom',
        },
        {
            label: '歌单',
            href: 'playList',
        },
        {
            label: '排行榜',
            href: 'topList',
        },
        {
            label: '歌手',
            href: 'artistlist',
        },
        {
            label: '最新音乐',
            href: 'newMusic',
        },
    ];

    const handleTabClick = (index: number) => {
        navigate(tabData[index].href);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        const musicTab: string = newValue + '';
        window.sessionStorage.setItem('musicTab', musicTab);
        setValue(newValue);
        handleTabClick(newValue);
    };
    const setActiveTab = () => {
        setValue(0);
    };
    useEffect(() => {
        const tabIndex: string | null =
            window.sessionStorage.getItem('musicTab');
        if (tabIndex) {
            setValue(parseInt(tabIndex));
        }
        eventBus.on('setActiveTab', setActiveTab);
        return () => {
            eventBus.off('setActiveTab', setActiveTab);
        };
    }, []);
    return (
        <Tabs
            variant="scrollable"
            scrollButtons={false}
            sx={{
                '& .MuiTabs-indicator': {
                    height: '4px',
                    backgroundColor: 'rgb(236,65,65)',
                    borderRadius: '8px',
                    padding: '0 20px',
                    boxSizing: 'border-box',
                },
                '& .Mui-selected ': {
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#373737!important',
                },
            }}
            value={value}
            onChange={handleChange}
        >
            {tabData.map((tab, index) => (
                <LinkTab key={index} {...tab} />
            ))}
        </Tabs>
    );
}

export default RouterTab;
