// 作废

import React, { Suspense, ReactNode } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const Layout = React.lazy(() => import('../views/Layout'));
const PersonalRecom = React.lazy(
    () => import('../views/personalRecom/PersonalRecom'),
);
const NotFount = React.lazy(() => import('@/views/notFount/NotFount'));

function IndexRouter() {
    return (
        // <Suspense>
        <Routes>
            <Route path="/music" element={<Layout></Layout>}>
                <Route
                    path="/music/personalRecom"
                    element={<PersonalRecom></PersonalRecom>}
                ></Route>
            </Route>
            <Route path="/" element={<Navigate to="/music"></Navigate>}></Route>
            <Route path="*" element={<NotFount></NotFount>}></Route>
        </Routes>
        // </Suspense>
    );
}

export default IndexRouter;
