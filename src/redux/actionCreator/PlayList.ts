import { TracksInt } from '@/types/personalRecom';
import { songUrl } from '@/api/api_playlist';

export interface ResponseInt {
    code: number;
    data: TracksInt[];
}
interface ActiveInt {
    type: 'change_song';
    payload: TracksInt;
}

async function changeSong(songInfo: TracksInt) {
    const params = {
        id: songInfo.id,
    };
    const payload = { ...songInfo } as TracksInt;

    const res: ResponseInt = (await songUrl(params)) as ResponseInt;
    if (res.code === 200) {
        payload.url = res.data[0].url;
        console.log(payload);
    }
    const action: ActiveInt = {
        type: 'change_song',
        payload,
    };

    return action;
}

export { changeSong };
export type { ActiveInt };
