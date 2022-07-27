import { PlayListInt } from '@/types/personalRecom';
import { songUrl } from '@/api/api_playlist';

export interface ResponseInt {
    code: number;
    data: PlayListInt[];
}
interface ActiveInt {
    type: 'change_song';
    payload: PlayListInt;
}

async function changeSong(songInfo: PlayListInt) {
    const params = {
        id: songInfo.id,
    };
    let payload = {} as PlayListInt;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await songUrl(params).then((res: ResponseInt) => {
        if (res.code === 200) {
            payload = { ...res.data[0] };
        }
    });
    const action: ActiveInt = {
        type: 'change_song',
        payload,
    };

    return action;
}

export { changeSong };
export type { ActiveInt };
