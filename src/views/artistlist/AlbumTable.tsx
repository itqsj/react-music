import React, { FC } from 'react';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import style from './css/albumTable.module.less';
import { TracksInt } from '@/types/playList';
import { connect } from 'react-redux';
import { changeSong, changePlaySongs } from '@/redux/actionCreator/PlayList';
import { ArtistAlbumsInt } from '@/types/artist';
import { getTime } from '@/untils/filters';

interface PropsInt {
    songs: TracksInt[];
    album?: ArtistAlbumsInt;
    changeSong: (data: TracksInt) => void;
    changePlaySongs: (data: TracksInt[]) => void;
}

const AlbumTable: FC<PropsInt> = React.memo(
    ({ songs, album, changeSong, changePlaySongs }) => {
        const handlePlay = (songData: TracksInt) => {
            changeSong(songData);
            changePlaySongs(songs);
        };
        return (
            <div className={[style.page, 'mleft-20'].join(' ')}>
                <h4 className="font-14 font-bold mtop-10 mbottom-10">
                    {album ? album.name : '热门五十首'}
                    <PlayCircleOutlineIcon
                        sx={{ marginLeft: '10px' }}
                    ></PlayCircleOutlineIcon>
                </h4>
                <div className={style.table}>
                    <div className={style.table_cell}>
                        <div className={style.table_cell_left}>
                            <div
                                className={[
                                    style.table_cell_left_index,
                                    'font-14',
                                    'font-bold',
                                    'pleft-10',
                                ].join(' ')}
                            >
                                序号
                            </div>
                            <div className="font-bold font-14">音乐标题</div>
                        </div>
                        <div
                            className={[
                                style.table_cell_time,
                                'font-14',
                                'font-bold',
                            ].join(' ')}
                        >
                            时长
                        </div>
                    </div>
                    {/* //表身 */}
                    {songs.length &&
                        songs
                            .filter((item, index) => index < 10)
                            .map((item, index) => (
                                <div
                                    key={item.id}
                                    className={[
                                        style.table_cell,
                                        index % 2 === 0 ? style.cell_bg : '',
                                    ].join(' ')}
                                    style={{
                                        color: 'rgba(0,0,0,08)',
                                    }}
                                    onClick={() => handlePlay(item)}
                                >
                                    <div className={style.table_cell_left}>
                                        <div
                                            className={[
                                                style.table_cell_left_index,
                                                'font-14',
                                                'pleft-10',
                                            ].join(' ')}
                                        >
                                            {index + 1}
                                        </div>
                                        <div className=" font-14">
                                            {item.name}
                                        </div>
                                    </div>
                                    <div
                                        className={[
                                            style.table_cell_time,
                                            'font-14',
                                        ].join(' ')}
                                    >
                                        {getTime(item.dt / 1000, true)}
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
        );
    },
);
const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};

const mapDispatchToProps = {
    changeSong,
    changePlaySongs,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumTable);
