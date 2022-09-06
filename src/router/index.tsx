import React, { ReactNode, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const Layout = React.lazy(() => import('../views/Layout'));
const PersonalRecom = React.lazy(
    () => import('../views/personalRecom/PersonalRecom'),
);
// const VideoDetail = React.lazy(
//     () => import('@/views/video/videoDetail/VideoDetail'),
// );
import VideoDetail from '@/views/video/videoDetail/VideoDetail';
const SongList = React.lazy(() => import('@/views/songList/SongList'));
// import SongList from '@/views/songList/SongList';
import Home from '@/views/home/Home';
const NotFount = React.lazy(() => import('@/views/notFount/NotFount'));

const lazyLoad = (children: ReactNode): ReactNode => {
    return <Suspense fallback={<div>loading</div>}>{children}</Suspense>;
};

const routes: RouteObject[] = [
    {
        path: '/',
        element: lazyLoad(<Layout></Layout>),
        children: [
            {
                path: 'home',
                element: lazyLoad(<Home></Home>),
                children: [
                    {
                        path: 'personalRecom',
                        element: lazyLoad(<PersonalRecom></PersonalRecom>),
                    },
                ],
            },
            {
                path: 'songlist',
                element: lazyLoad(<SongList></SongList>),
            },
            {
                path: '/videoDetail',
                element: <VideoDetail></VideoDetail>,
            },
        ],
    },

    {
        path: '*',
        element: lazyLoad(<NotFount></NotFount>),
    },
];

export default routes;
