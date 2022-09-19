import React, { FC, useEffect, useState } from 'react';
import AlbumTable from './AlbumTable';

import style from './css/albumItem.module.less';
import { TracksInt } from '@/types/playList';
import { ArtistAlbumsInt, ParamsInt } from '@/types/artist';
import { albumDetail } from '@/api/api_artist';

interface PropsInt {
    songs: TracksInt[];
    album?: ArtistAlbumsInt;
}

interface ResAlbumSong {
    code: number;
    album: ArtistAlbumsInt;
    resourceState: boolean;
    songs: TracksInt[];
}
const AlbumItem: FC<PropsInt> = React.memo(({ songs, album }) => {
    const [tableSongs, setTableSongs] = useState<TracksInt[]>(
        [] as TracksInt[],
    );
    const getAlbumDetail = async () => {
        const params = {
            id: album?.id,
        } as ParamsInt;
        const res: ResAlbumSong = (await albumDetail(params)) as ResAlbumSong;
        if (res.code === 200) {
            setTableSongs(res.songs);
        }
    };
    useEffect(() => {
        if (album) {
            getAlbumDetail();
        }
    }, [album]);
    useEffect(() => {
        if (songs.length) {
            setTableSongs(songs);
        }
    }, [songs]);

    return (
        <div className={[style.item, 'mtop-10'].join(' ')}>
            {album ? (
                <img src={album?.picUrl + '?param=300y300'} alt="" />
            ) : (
                <img
                    src="http://47.102.159.133/img/top50.89421d54.png?param=300y300"
                    alt=""
                />
            )}

            <AlbumTable album={album} songs={tableSongs}></AlbumTable>
        </div>
    );
});

export default AlbumItem;
