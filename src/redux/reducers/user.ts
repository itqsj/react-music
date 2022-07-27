import { userAccount } from '@/api/api_user';

interface ActionInt {
    type: string;
    payload?: any;
}
interface PrevStateInt {
    isPhone: boolean;
}

export const UserReducer = (
    prevState: PrevStateInt = {
        isPhone: false,
    },
    action: ActionInt,
) => {
    const { type, payload } = action;
    const newState = { ...prevState };
    switch (type) {
        case 'change_isphone':
            newState.isPhone = payload;
            return newState;
        case 'get_account':
            userAccount();
            return newState;
        default:
            return prevState;
    }
};
