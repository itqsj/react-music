import { userAccount } from '@/api/api_user';
import { ResUserInfoInt } from '@/types/user';

function changeIsPhone(payload: boolean) {
    const action = {
        type: 'change_isphone',
        payload,
    };

    return action;
}

async function getAccount() {
    const res: ResUserInfoInt = (await userAccount()) as ResUserInfoInt;

    if (res.code === 200) {
        const action = {
            type: 'get_account',
            payload: res.profile,
        };
        return action;
    }
}

export { changeIsPhone, getAccount };
