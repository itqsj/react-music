// 作废

import Login from '@/views/login/Login';
import React, { Suspense, ReactNode } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const Layout = React.lazy(() => import('../views/Layout'));
const PersonalRecom = React.lazy(
    () => import('../views/personalRecom/PersonalRecom'),
);
const NotFount = React.lazy(() => import('@/views/notFount/NotFount'));

function IndexRouter() {
    return (
        // <Navigate to="/music"></Navigate>
        // <Suspense>
        <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/*" element={<Layout></Layout>}></Route>
            <Route path="*" element={<NotFount></NotFount>}></Route>
        </Routes>
        // </Suspense>
    );
}

export default IndexRouter;
