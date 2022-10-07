import React, { useEffect } from 'react';

import RouterTab from '@/components/tab/RouterTab';

import { useLocation, useNavigate } from 'react-router-dom';

import HomeRouter from '@/router/HomeRouter';

function Home() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        if (pathname === '/home') {
            navigate('/home/personalRecom');
        }
    }, []);
    return (
        <div>
            <RouterTab></RouterTab>
            <div>
                {/* <Outlet /> */}
                <HomeRouter></HomeRouter>
            </div>
        </div>
    );
}

export default Home;
