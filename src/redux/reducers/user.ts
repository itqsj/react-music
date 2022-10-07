import { fromJS } from 'immutable';
import { UserInfoInt } from '@/types/user';

interface ActionInt {
    type: string;
    payload?: any;
}
interface PrevStateInt {
    isPhone: boolean;
    userInfo: UserInfoInt;
    isLogin: boolean;
}

export const UserReducer = (
    prevState: PrevStateInt = {
        isPhone: false,
        isLogin: false,
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
        case 'change_account':
            const login = payload ? true : false;
            return (
                newState
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    .set('userInfo', payload)
                    .set('isLogin', login)
                    .toJS()
            );
        default:
            return prevState;
    }
};
