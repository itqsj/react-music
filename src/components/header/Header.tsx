import React, {
    FC,
    useState,
    FocusEvent,
    useEffect,
    KeyboardEvent,
} from 'react';

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
import MenuIcon from '@mui/icons-material/Menu';
import FocusPopper from '../focusPopper/FocusPopper';
import SearchPopper from '@/views/search/SearchPopper';

import { connect } from 'react-redux/es/exports';
import { useNavigate, useLocation } from 'react-router-dom';
import { eventBus } from '@/untils/eventBus';
import { UserInfoInt } from '@/types/user';

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

interface PropsInt {
    isPhone?: boolean;
    userInfo: UserInfoInt;
}

const Header: FC<PropsInt> = React.memo(({ isPhone, userInfo }) => {
    const [element, setelement] = useState<HTMLElement | null>(null);
    const navigate = useNavigate();
    const local = useLocation();
    const searchFocus = (event: FocusEvent<HTMLElement>) => {
        setelement(event.target.parentElement.parentElement);
    };
    const saveSearchHistry = (value: string) => {
        let searchLis = JSON.parse(
            window.localStorage.getItem('search') || '[]',
        );
        const isInclude = searchLis.includes(value);
        if (isInclude) {
            searchLis = searchLis.filter(
                (item: string) => item !== value.trim(),
            );
        }
        searchLis.unshift(value.trim());
        window.localStorage.setItem('search', JSON.stringify(searchLis));
    };
    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        const keyCode = event.keyCode;
        if (keyCode === 13) {
            handleSearch(event.target.value);
        }
    };
    const handleSearch = (data: string) => {
        navigate(`/searchDetail?key=${data}`);

        saveSearchHistry(data);

        if (local.pathname === '/searchDetail') {
            // setSearch(`key=${event.target.value}`);
            window.location.reload();
        }
    };
    useEffect(() => {
        eventBus.on('search', handleSearch);

        return () => {
            eventBus.off('search', handleSearch);
        };
    }, []);

    useEffect(() => {
        // console.log(userInfo);
    }, [userInfo]);

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
                    {!isPhone && (
                        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                            News
                        </Typography>
                    )}
                    {!isPhone && (
                        <IconButton onClick={() => navigate(-1)}>
                            <ArrowBackIosNew />
                        </IconButton>
                    )}

                    {!isPhone && (
                        <IconButton>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    )}

                    <Search>
                        <SearchIconWrapper
                            onClick={() => navigate(`/searchDetail?key=晚安`)}
                        >
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onFocus={searchFocus}
                            onBlur={() => setelement(null)}
                            onKeyUp={handleKeyUp}
                        />
                    </Search>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    <Avatar
                        alt="Remy Sharp"
                        src={
                            userInfo.backgroundUrl
                                ? userInfo.backgroundUrl
                                : '/static/images/avatar/1.jpg'
                        }
                    />
                </Toolbar>
            </AppBar>
            <FocusPopper element={element}>
                <SearchPopper></SearchPopper>
            </FocusPopper>
        </Box>
    );
});

const mapStateToProps = function (store: any) {
    return {
        isPhone: store.UserReducer.isPhone,
        userInfo: store.UserReducer.userInfo,
    };
};

export default connect(mapStateToProps)(Header);
