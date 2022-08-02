import http from './api_index';

// 歌单评论
export function playlistComment(id: string) {
    return http({
        url: '/api/comment/playlist',
        data: {
            timestamp: Date.now(),
            limit: 25,
            id,
        },
    });
}
