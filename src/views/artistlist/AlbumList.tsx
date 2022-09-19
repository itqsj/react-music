import React, { FC, useEffect, useState } from 'react';

import AlbumItem from './AlbumItem';

import { TracksInt } from '@/types/playList';
import { ResArtistAlbumsInt, ArtistAlbumsInt } from '@/types/artist';
import { artistAlbum } from '@/api/api_artist';
import { useSearchParams } from 'react-router-dom';
import Animation from '@/components/animation/Animation';

interface PropsInt {
    topSongs: TracksInt[];
}
const AlbumList: FC<PropsInt> = React.memo(({ topSongs }) => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') as string;
    const [albums, setAlbums] = useState<ArtistAlbumsInt[]>(
        [] as ArtistAlbumsInt[],
    );

    const getArtistAlbum = async () => {
        const params = {
            id,
            limit: 50,
        };
        const res: ResArtistAlbumsInt = (await artistAlbum(
            params,
        )) as ResArtistAlbumsInt;
        if (res.code === 200) {
            setAlbums(res.hotAlbums);
        }
    };
    useEffect(() => {
        getArtistAlbum();
    }, []);

    return (
        <Animation>
            <div>
                <AlbumItem songs={topSongs}></AlbumItem>
                {albums.length &&
                    albums.map((item) => (
                        <AlbumItem
                            key={item.id}
                            songs={topSongs}
                            album={item}
                        ></AlbumItem>
                    ))}
            </div>
        </Animation>
    );
});

export default AlbumList;
