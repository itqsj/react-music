import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';

import { styled, alpha } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Avatar,
    IconButton,
    InputBase,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { connect } from 'react-redux/es/exports';
import MenuIcon from '@mui/icons-material/Menu';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Header(props: any) {
    const handleChange = () => {
        return false;
    };
    return (
        <Box
            sx={{
                width: '100vw',
                backgroundColor: '#ec4141',
                boxShadow:
                    'rgb(236, 65, 65) 0px 1px 4px, rgb(236, 65, 65) 0px 3px 12px 2px',
                '& .MuiPaper-root': { backgroundColor: '#ec4141' },
            }}
        >
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {!props.isPhone && (
                        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                            News
                        </Typography>
                    )}
                    {!props.isPhone && (
                        <IconButton>
                            <ArrowBackIosNew />
                        </IconButton>
                    )}

                    {!props.isPhone && (
                        <IconButton>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    )}

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleChange}
                        />
                    </Search>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

export default connect(mapStateToProps)(Header);
