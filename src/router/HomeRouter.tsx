import React, { Suspense, ReactNode } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const NotFount = React.lazy(() => import('@/views/notFount/NotFount'));
const NewMusic = React.lazy(() => import('@/views/newMusic/NewMusic'));
const PlayList = React.lazy(() => import('@/views/playList/PlayList'));
const TopList = React.lazy(() => import('@/views/topList/TopList'));
const Artistlist = React.lazy(() => import('@/views/artistlist/Artistlist'));
import Loading from '@/components/loading/Loading';
const lazyLoad = (children: ReactNode): ReactNode => {
    return <Suspense fallback={<Loading></Loading>}>{children}</Suspense>;
};
const PersonalRecom = React.lazy(
    () => import('../views/personalRecom/PersonalRecom'),
);

function HomeRouter() {
    return (
        // <Suspense>
        <Routes>
            <Route
                path="personalRecom"
                element={lazyLoad(<PersonalRecom></PersonalRecom>)}
            ></Route>
            <Route
                path="playList"
                element={lazyLoad(<PlayList></PlayList>)}
            ></Route>
            <Route
                path="topList"
                element={lazyLoad(<TopList></TopList>)}
            ></Route>
            <Route
                path="artistlist"
                element={lazyLoad(<Artistlist></Artistlist>)}
            ></Route>
            <Route
                path="newMusic"
                element={lazyLoad(<NewMusic></NewMusic>)}
            ></Route>

            {/* <Route path="/" element={<Navigate to="/music"></Navigate>}></Route> */}
            <Route path="*" element={<NotFount></NotFount>}></Route>
        </Routes>
        // </Suspense>
    );
}

export default HomeRouter;
