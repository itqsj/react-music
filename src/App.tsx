import { useEffect, useState } from 'react';
import './App.css';

import { browsers } from '@/untils/browser';
import { connect } from 'react-redux/es/exports';
import { changeIsPhone, getAccount } from '@/redux/actionCreator/User';
import Layout from './views/Layout';

import { useRoutes } from 'react-router-dom';
import routes from '@/router/index';
import { AnimatePresence, motion } from 'framer-motion';

function App(props: any) {
    const resize = () => {
        const isPhone = browsers();
        props.changeIsPhone(isPhone);
    };
    useEffect(() => {
        props.getAccount();
        const isPhone = browsers();
        props.changeIsPhone(isPhone);
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);
    return (
        <div className="App">
            <AnimatePresence>
                <motion.div
                    style={{ overflow: 'hidden' }}
                    key="modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                    {useRoutes(routes)}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

const mapDispatchToProps = {
    changeIsPhone,
    getAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
