function changeIsPhone(payload: boolean) {
    const action = {
        type: 'change_isphone',
        payload,
    };
    return action;
}

function getAccount(payload: boolean) {
    const action = {
        type: 'get_account',
        payload,
    };
    return action;
}

export { changeIsPhone, getAccount };
