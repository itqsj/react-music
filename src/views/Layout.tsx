import React, { useEffect } from 'react';

import Header from '@/components/header/Header';
import Menu from '@/components/menu/Menu';
import { AnimatePresence, motion } from 'framer-motion';
import Player from '@/components/player/Player';

import style from './css/layout.module.less';
import { connect } from 'react-redux/es/exports';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const transition = {
    duration: 1,
    ease: [0.43, 0.13, 0.23, 0.96],
};

const imageVariants = {
    exit: { y: '25%', opacity: 0, transition },
    enter: {
        y: '0%',
        opacity: 1,
        transition,
    },
};

interface LayoutPropInt {
    isPhone: boolean;
}

function Layout({ isPhone }: LayoutPropInt) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
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
                    }}
                >
                    <AnimatePresence>
                        <motion.div
                            className="single"
                            initial="exit"
                            animate="enter"
                            exit="exit"
                        >
                            <motion.div
                                style={{ overflow: 'hidden' }}
                                key="modal"
                                variants={imageVariants}
                            >
                                <Outlet />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
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

export default connect(mapStateToProps)(Layout);
