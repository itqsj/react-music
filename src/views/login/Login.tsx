import React, { FC, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';

import style from './css/login.module.less';
import QrLogin from './QrLogin';

const Login: FC = () => {
    const [value, setValue] = useState<string>('2');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <div className={style.page}>
            <div className={style.page_card}>
                <h3>二维码登录</h3>
                <TabContext value={value}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TabList
                            onChange={handleChange}
                            sx={{
                                '& .Mui-selected': {
                                    fontWeight: 700,
                                    color: ' #423d3d',
                                },
                            }}
                        >
                            <Tab label="手机号" value="1" />
                            <Tab label="二维码" value="2" />
                            <Tab label="验证码" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">
                        <QrLogin></QrLogin>
                    </TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </div>
        </div>
    );
};

export default Login;
