import http from './api_index';
import { ParamsInt } from '@/types/artist';

// 歌手分类列表
export function artistList(params: ParamsInt) {
    return http({
        url: '/api/artist/list',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//歌手详情
export function artistDetail(params: ParamsInt) {
    return http({
        url: '/api/artist/detail',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//歌手热门的50首
export function artistTopSong(params: ParamsInt) {
    return http({
        url: '/api/artist/top/song',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//歌手专辑
export function artistAlbum(params: ParamsInt) {
    return http({
        url: '/api/artist/album',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//歌手mv
export function artistMv(params: ParamsInt) {
    return http({
        url: '/api/artist/mv',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//歌手简介
export function artistDesc(params: ParamsInt) {
    return http({
        url: '/api/artist/desc',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}
