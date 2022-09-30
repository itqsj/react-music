import React, { FC, useEffect, useState } from 'react';

import Animation from '@/components/animation/Animation';

import { useSearchParams } from 'react-router-dom';
import { album } from '@/api/api_album';
import { ResAlbumDetailInt } from '@/types/album';
import { ArtistAlbumsInt } from '@/types/artist';
import { TracksInt, PlayListAndArtistAlbumsInt } from '@/types/playList';
import CardInfo from '@/components/info/cardInfo/CardInfo';

const AlbumDetail: FC = () => {
    const [search] = useSearchParams();
    const id = search.get('id') as string;
    const [songs, setSongs] = useState<TracksInt[]>([]);
    const [albumDetail, setAlbumDetail] = useState<ArtistAlbumsInt>(
        {} as ArtistAlbumsInt,
    );

    const getAlbum = async () => {
        const params = {
            id,
        };
        const res: ResAlbumDetailInt = (await album(
            params,
        )) as ResAlbumDetailInt;
        if (res.code === 200) {
            setSongs(res.songs);
            setAlbumDetail(res.album);
        }
    };
    useEffect(() => {
        getAlbum();
    }, []);

    return (
        <Animation>
            <CardInfo
                module="album"
                data={albumDetail as PlayListAndArtistAlbumsInt}
            ></CardInfo>
        </Animation>
    );
};

export default AlbumDetail;
