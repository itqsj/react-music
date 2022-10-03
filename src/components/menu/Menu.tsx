import React from 'react';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

import { useNavigate } from 'react-router-dom';
import { eventBus } from '@/untils/eventBus';

function Menu() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/home/personalRecom');
        eventBus.emit('setActiveTab');
    };
    return (
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList
                sx={{
                    height: 'calc(100vh - 90px)',
                    padding: '10px 15px 0',
                }}
            >
                <MenuItem
                    sx={{
                        height: 50,
                        background: '#dbdbdb',
                    }}
                    onClick={handleClick}
                >
                    <ListItemText>发现音乐</ListItemText>
                </MenuItem>
                <MenuItem
                    sx={{
                        height: 50,
                    }}
                >
                    <ListItemText>视频</ListItemText>
                </MenuItem>
                <MenuItem
                    sx={{
                        height: 50,
                    }}
                >
                    <ListItemText>朋友</ListItemText>
                </MenuItem>

                <MenuItem
                    sx={{
                        height: 50,
                    }}
                >
                    <ListItemText>直播</ListItemText>
                </MenuItem>

                <MenuItem
                    sx={{
                        height: 50,
                    }}
                >
                    <ListItemText>私人FM</ListItemText>
                </MenuItem>
                <MenuItem
                    sx={{
                        height: 50,
                    }}
                >
                    <ListItemText>我的音乐</ListItemText>
                </MenuItem>
                <MenuItem
                    sx={{
                        height: 50,
                    }}
                >
                    <ListItemIcon>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>本地音乐</ListItemText>
                </MenuItem>
                <MenuItem
                    sx={{
                        height: 50,
                    }}
                >
                    <ListItemIcon>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>下载管理</ListItemText>
                </MenuItem>
                <MenuItem
                    sx={{
                        height: 50,
                    }}
                >
                    <ListItemText>最近播放</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                    sx={{
                        height: 50,
                    }}
                >
                    <ListItemIcon>
                        <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>创建的歌单</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}

export default Menu;
