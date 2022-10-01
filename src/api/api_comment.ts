import http from './api_index';

interface ParamsInt {
    id?: string;
    limit?: number;
    offset?: number;
    before?: number;
}

// 歌单评论
export function playlistComment(id: string) {
    return http({
        url: '/api/comment/playlist',
        params: {
            timestamp: Date.now(),
            limit: 25,
            id,
        },
    });
}

// mv评论
export function commentMv(id: string) {
    return http({
        url: '/api/comment/mv',
        params: {
            timestamp: Date.now(),
            limit: 25,
            id,
        },
    });
}

//专辑评论/
export function commentAblum(params: ParamsInt) {
    return http({
        url: '/api/comment/album',
        params: {
            timestamp: Date.now(),
            ...params,
        },
    });
}
