import http from './api_index';

// 账号信息
export function userAccount() {
    return http({
        url: '/api/user/account',
        data: {
            timestamp: Date.now(),
        },
    });
}
