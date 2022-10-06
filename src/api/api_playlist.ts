import http from './api_index';

export interface ParamsIdInt {
    id?: string | null | number;
    Uid?: string | null | number;
    limit?: number;
    cat?: string;
    offset?: number;
}

// 账号信息
export function getPersonalized() {
    return http({
        url: '/api/personalized',
        params: {
            timestamp: Date.now(),
            limit: 25,
        },
    });
}

//歌单详情
export function playListDetail(params: ParamsIdInt) {
    return http({
        url: '/api/playlist/detail',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//歌单详情
export function songUrl(params: ParamsIdInt) {
    return http({
        url: '/api/song/url',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//判断音乐是否可用
export function checkMusic(params: ParamsIdInt) {
    return http({
        url: '/api/check/music',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//获取歌词
export function songLyric(params: ParamsIdInt) {
    return http({
        url: '/api/lyric',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//获取精品歌单
export function playlistHighquality(params: ParamsIdInt) {
    return http({
        url: '/api/top/playlist/highquality',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//歌单列表
export function topPlayList(params: ParamsIdInt) {
    return http({
        url: '/api/top/playlist',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//歌单分类标签
export function playlistLabel() {
    return http({
        url: '/api/playlist/hot',
        params: {
            timestamp: Date.now(),
        },
    });
}

//全部标签
export function playCatlist() {
    return http({
        url: '/api/playlist/catlist',
        params: {
            timestamp: Date.now(),
        },
    });
}

//全部榜单/
export function allTopList() {
    return http({
        url: '/api/toplist',
        params: {
            timestamp: Date.now(),
        },
    });
}

//获取用户歌单
export function userPlaylist(params: ParamsIdInt) {
    return http({
        url: '/api/user/playlist',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//歌单
export function cloudSearch(params: ParamsIdInt) {
    return http({
        url: '/api/cloudsearch',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}

//私人 FM/
export function personalFm() {
    return http({
        url: '/api/personal_fm',
        params: {
            timestamp: Date.now(),
        },
    });
}

//歌词
export function lyric(params: ParamsIdInt) {
    return http({
        url: '/api/lyric',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}
