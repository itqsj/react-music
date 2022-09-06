import http from './api_index';

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
