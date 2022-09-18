import React, { useEffect, useState, ReactNode, FC } from 'react';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

interface LinkTabProps {
    label?: string;
    value: string;
    children: ReactNode;
}

interface PropsInt {
    tabs: LinkTabProps[];
    change: (newValue: string) => void;
}

const NormalTabs: FC<PropsInt> = React.memo(({ tabs, change }) => {
    const [value, setValue] = useState<string>('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        change(newValue);
    };

    return (
        <TabContext value={value}>
            <TabList
                variant="scrollable"
                scrollButtons={false}
                onChange={handleChange}
                sx={{
                    borderRadius: '15px',
                    margin: '20px 0 0',
                    '& .MuiTabs-flexContainer': {
                        justifyContent: 'center',
                    },
                    '& .MuiButtonBase-root': {
                        padding: '0 15px',
                    },
                    '&  .css-uekjgu-MuiButtonBase-root-MuiTab-root': {
                        minWidth: '100px',
                        minHeight: '30px',
                        height: '30px',
                    },
                    '& .MuiTabs-scroller': {
                        minHeight: '30px',
                        height: '30px',
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#bbb',
                        height: '100%',
                        borderRadius: '15px',
                    },
                    '& .Mui-selected': {
                        color: '#fff',
                        zIndex: '1',
                    },
                }}
            >
                {tabs.map((tab, index) => (
                    <Tab
                        sx={{
                            fontSize: '14px',
                            height: '60px',
                        }}
                        component="span"
                        label={tab.label}
                        value={tab.value}
                        key={tab.value}
                    ></Tab>
                ))}
            </TabList>
            {tabs.map((tab, index) => (
                <TabPanel
                    sx={{ padding: '5px 0 0 0' }}
                    key={tab.value}
                    value={tab.value}
                >
                    {tab.children}
                </TabPanel>
            ))}
        </TabContext>
    );
});

export default NormalTabs;
