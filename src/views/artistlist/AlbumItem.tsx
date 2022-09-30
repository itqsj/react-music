import React, { FC, useEffect, useState } from 'react';
import AlbumTable from './AlbumTable';

import style from './css/albumItem.module.less';
import { TracksInt } from '@/types/playList';
import { ArtistAlbumsInt, ParamsInt } from '@/types/artist';
import { albumDetail } from '@/api/api_album';
import ImgBox from '@/components/imgBox/ImgBox';

interface PropsInt {
    songs: TracksInt[];
    album?: ArtistAlbumsInt;
    isHot?: boolean;
}

interface ResAlbumSong {
    code: number;
    album: ArtistAlbumsInt;
    resourceState: boolean;
    songs: TracksInt[];
}
const AlbumItem: FC<PropsInt> = React.memo(
    ({ songs, album, isHot = false }) => {
        const [tableSongs, setTableSongs] = useState<TracksInt[]>(
            [] as TracksInt[],
        );
        const getAlbumDetail = async () => {
            const params = {
                id: album?.id,
            } as ParamsInt;
            const res: ResAlbumSong = (await albumDetail(
                params,
            )) as ResAlbumSong;
            if (res.code === 200) {
                setTableSongs(res.songs);
            }
        };
        useEffect(() => {
            if (album?.id && !isHot) {
                getAlbumDetail();
            }
        }, [album]);
        useEffect(() => {
            if (songs.length && isHot) {
                setTableSongs(songs);
            }
        }, [songs]);

        return (
            <div className={[style.item, 'mtop-10'].join(' ')}>
                <div className={style.item_img}>
                    {album ? (
                        <ImgBox src={album?.picUrl + '?param=300y300'} alt="" />
                    ) : (
                        <ImgBox
                            src="http://47.102.159.133/img/top50.89421d54.png?param=300y300"
                            alt=""
                        />
                    )}
                </div>

                <AlbumTable album={album} songs={tableSongs}></AlbumTable>
            </div>
        );
    },
);

export default AlbumItem;
