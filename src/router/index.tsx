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
const PlayListDetail = React.lazy(
    () => import('@/views/playList/PlayListDetail'),
);
// import SongList from '@/views/songList/SongList';
import Home from '@/views/home/Home';
// import NewMusic from '@/views/newMusic/NewMusic';
const NewMusic = React.lazy(() => import('@/views/newMusic/NewMusic'));
const PlayList = React.lazy(() => import('@/views/playList/PlayList'));
const TopList = React.lazy(() => import('@/views/topList/TopList'));
const Artistlist = React.lazy(() => import('@/views/artistlist/Artistlist'));
const ArtistDetail = React.lazy(
    () => import('@/views/artistlist/ArtistDetail'),
);
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
                    {
                        path: 'playList',
                        element: lazyLoad(<PlayList></PlayList>),
                    },
                    {
                        path: 'topList',
                        element: lazyLoad(<TopList></TopList>),
                    },
                    {
                        path: 'artistlist',
                        element: <Artistlist></Artistlist>,
                    },
                    {
                        path: 'newMusic',
                        element: <NewMusic></NewMusic>,
                    },
                ],
            },
            {
                path: 'playListDetail',
                element: lazyLoad(<PlayListDetail></PlayListDetail>),
            },
            {
                path: '/videoDetail',
                element: lazyLoad(<VideoDetail></VideoDetail>),
            },
            {
                path: '/artistDetail',
                element: <ArtistDetail></ArtistDetail>,
            },
        ],
    },

    {
        path: '*',
        element: lazyLoad(<NotFount></NotFount>),
    },
];

export default routes;
