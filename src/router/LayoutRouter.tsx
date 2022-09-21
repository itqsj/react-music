import React, { Suspense, ReactNode } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Loading from '@/components/loading/Loading';

const NotFount = React.lazy(() => import('@/views/notFount/NotFount'));
import VideoDetail from '@/views/video/videoDetail/VideoDetail';
const PlayListDetail = React.lazy(
    () => import('@/views/playList/PlayListDetail'),
);
const ArtistDetail = React.lazy(
    () => import('@/views/artistlist/ArtistDetail'),
);
import Home from '@/views/home/Home';
const lazyLoad = (children: ReactNode): ReactNode => {
    return <Suspense fallback={<Loading></Loading>}>{children}</Suspense>;
};
const PersonalRecom = React.lazy(
    () => import('../views/personalRecom/PersonalRecom'),
);

function LayoutRouter() {
    return (
        <Routes>
            <Route path="/home/*" element={lazyLoad(<Home></Home>)}></Route>
            <Route
                path="/playListDetail"
                element={lazyLoad(<PlayListDetail></PlayListDetail>)}
            ></Route>
            <Route
                path="videoDetail"
                element={lazyLoad(<VideoDetail></VideoDetail>)}
            ></Route>
            <Route
                path="artistDetail"
                element={lazyLoad(<ArtistDetail></ArtistDetail>)}
            ></Route>

            <Route path="*" element={<NotFount></NotFount>}></Route>
        </Routes>
    );
}

export default LayoutRouter;
