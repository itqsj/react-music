import React, { useEffect } from 'react';

import Header from '@/components/header/Header';
import Menu from '@/components/menu/Menu';
import Player from '@/components/player/Player';
import LayoutRouter from '@/router/LayoutRouter';

import style from './css/layout.module.less';
import { connect } from 'react-redux/es/exports';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAccount } from '@/redux/actionCreator/User';

interface LayoutPropInt {
    isPhone: boolean;
    getAccount: () => void;
}

function Layout({ isPhone, getAccount }: LayoutPropInt) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        getAccount();
        if (pathname === '/') {
            navigate('/home');
        }
    }, []);
    return (
        <div>
            <Header></Header>
            <div className={style.layout}>
                <div className={style.layout_menu}>
                    <Menu></Menu>
                </div>

                <div
                    className={style.layout_body}
                    style={{
                        maxWidth: '1240px',
                        border: 'none',
                        margin: '3px auto',
                        borderRadius: '8px',
                    }}
                >
                    {/* <Outlet /> */}
                    <LayoutRouter></LayoutRouter>
                </div>
                <div className={style.layout_footer}>
                    <Player></Player>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

const mapDispatchToProps = { getAccount };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
