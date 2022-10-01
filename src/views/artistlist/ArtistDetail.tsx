import Animation from '@/components/animation/Animation';
import React, {
    FC,
    useCallback,
    useState,
    useEffect,
    Suspense,
    ReactNode,
} from 'react';

import ArtistDetailInfo from './ArtistDetailInfo';
import NormalTabs from '@/components/tab/Tabs';
const AlbumList = React.lazy(() => import('./AlbumList'));
const AlbumMv = React.lazy(() => import('./ArtisMv'));
const ArtistDesc = React.lazy(() => import('./ArtistDesc'));
// import AlbumList from './AlbumList';
// import AlbumMv from './AlbumMv';
// import ArtistDesc from './ArtistDesc';
import Loading from '@/components/loading/Loading';
const lazyLoad = (children: ReactNode): ReactNode => {
    return <Suspense fallback={<Loading></Loading>}>{children}</Suspense>;
};

import style from './css/artistDetail.module.less';
import {
    artistDetail,
    artistDesc,
    artistTopSong,
    artistMv,
} from '@/api/api_artist';
import { useSearchParams } from 'react-router-dom';
import {
    ResArtistDetailInt,
    ArtistInfoInt,
    ResArtistDescInt,
} from '@/types/artist';
import { TracksInt } from '@/types/playList';
import { ArtistMvInt, MvListInt } from '@/types/video';

interface ResArtistMv {
    code: number;
    hasMore: boolean;
    mvs: ArtistMvInt[];
    time: number;
}
//歌手热门歌曲返回值
interface ResArtistTopSong {
    code: number;
    songs: TracksInt[];
    more: boolean;
}

const ArtistDetail: FC = () => {
    const [topSongs, setTopSongs] = useState<TracksInt[]>([] as TracksInt[]);
    const [artistMvList, setArtistMvList] = useState<ArtistMvInt[]>(
        [] as ArtistMvInt[],
    );
    const [desc, setDesc] = useState<ResArtistDescInt>({} as ResArtistDescInt);
    const tabData = [
        {
            label: '专辑',
            value: '1',
            children: lazyLoad(<AlbumList topSongs={topSongs}></AlbumList>),
        },
        {
            label: 'MV',
            value: '2',
            children: lazyLoad(
                <AlbumMv data={artistMvList as MvListInt[]}></AlbumMv>,
            ),
        },
        {
            label: '歌手详情',
            value: '3',
            children: lazyLoad(<ArtistDesc data={desc}></ArtistDesc>),
        },
        {
            label: '相似歌手',
            value: '4',
            children: <div>456</div>,
        },
    ];
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') as string;
    const [artistInfo, setArtistInfo] = useState<ArtistInfoInt>(
        {} as ArtistInfoInt,
    );

    const getArtistDetail = async () => {
        const params = {
            id,
        };
        const res: ResArtistDetailInt = (await artistDetail(
            params,
        )) as ResArtistDetailInt;
        if (res.code === 200) {
            setArtistInfo(res.data.artist);
        }
    };

    const getArtistTopSong = async () => {
        const params = {
            id,
        };
        const res: ResArtistTopSong = (await artistTopSong(
            params,
        )) as ResArtistTopSong;
        if (res.code === 200) {
            setTopSongs(res.songs);
        }
    };

    const getAlbumMv = async () => {
        const params = {
            id,
        };
        const res: ResArtistMv = (await artistMv(params)) as ResArtistMv;
        if (res.code === 200) {
            setArtistMvList(res.mvs);
        }
    };

    const getArtistDesc = async () => {
        const params = { id };
        const res: ResArtistDescInt = (await artistDesc(
            params,
        )) as ResArtistDescInt;
        if (res.code === 200) {
            setDesc(res);
        }
    };
    useEffect(() => {
        getArtistDetail();
        getArtistTopSong();
    }, []);

    const handleTabChange = useCallback(
        (active: string) => {
            switch (active) {
                case '2':
                    if (!artistMvList.length) {
                        getAlbumMv();
                    }
                    break;
                case '3':
                    if (JSON.stringify(desc) === '{}') {
                        getArtistDesc();
                    }
                    break;
            }
        },
        [tabData],
    );

    return (
        <Animation>
            <div className={style.page}>
                <ArtistDetailInfo data={artistInfo}></ArtistDetailInfo>
                <NormalTabs
                    tabs={tabData}
                    change={handleTabChange}
                ></NormalTabs>
            </div>
        </Animation>
    );
};

export default ArtistDetail;
