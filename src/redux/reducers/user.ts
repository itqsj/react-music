import { fromJS } from 'immutable';
import { UserInfoInt } from '@/types/user';

interface ActionInt {
    type: string;
    payload?: any;
}
interface PrevStateInt {
    isPhone: boolean;
    userInfo: UserInfoInt;
}

export const UserReducer = (
    prevState: PrevStateInt = {
        isPhone: false,
        userInfo: {} as UserInfoInt,
    },
    action: ActionInt,
) => {
    const { type, payload } = action;
    const newState = fromJS(prevState);

    switch (type) {
        case 'change_isphone':
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return newState.set('isPhone', payload).toJS();
        case 'get_account':
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return newState.set('userInfo', payload).toJS();
        default:
            return prevState;
    }
};
