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

const NormalTabs: FC<PropsInt> = React.memo((props) => {
    const [value, setValue] = useState<string>('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        props.change(newValue);
    };

    return (
        <TabContext value={value}>
            <TabList
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
                    '& .css-uekjgu-MuiButtonBase-root-MuiTab-root.Mui-selected ':
                        {
                            color: '#373737',
                            fontSize: '18px',
                            fontWeight: '800',
                        },
                }}
                onChange={handleChange}
            >
                {props.tabs.map((tab, index) => (
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
            {props.tabs.map((tab, index) => (
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
