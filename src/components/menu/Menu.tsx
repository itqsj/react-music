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

interface MenuInt {
    href: string;
    label: string;
    disabled?: boolean;
}

function Menu() {
    const navigate = useNavigate();
    const handleClick = (item: MenuInt) => {
        if ('/home/personalRecom' === item.href) {
            eventBus.emit('setActiveTab');
        }
        navigate(item.href);
    };
    const menuList: MenuInt[] = [
        {
            href: '/home/personalRecom',
            label: '发现音乐',
        },
        {
            href: '/personalfm',
            label: '视频',
            disabled: true,
        },
        {
            href: '/personalfm',
            label: '私人FM',
        },
        {
            href: '/personalfm',
            label: '每日推荐',
            disabled: true,
        },
        {
            href: '/personalfm',
            label: '最近播放',
            disabled: true,
        },
        {
            href: '/personalfm',
            label: '我的收藏',
            disabled: true,
        },
    ];
    return (
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList
                sx={{
                    height: 'calc(100vh - 90px)',
                    padding: '10px 15px 0',
                }}
            >
                {menuList.map((item: MenuInt, index) => (
                    <MenuItem
                        sx={{
                            height: 50,
                            background: index === 0 ? '#dbdbdb' : '',
                        }}
                        key={index}
                        disabled={item?.disabled}
                        onClick={() => handleClick(item)}
                    >
                        <ListItemText>{item.label}</ListItemText>
                    </MenuItem>
                ))}
            </MenuList>
        </Paper>
    );
}

export default Menu;
