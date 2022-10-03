import { TracksInt, CheckMusicInt } from '@/types/playList';
import { songUrl, checkMusic } from '@/api/api_playlist';

export interface ResponseInt {
    code: number;
    data: TracksInt[];
}
interface ActiveInt {
    type: string;
    payload: TracksInt;
}

interface PlaySongsPayloadInt {
    type: string;
    payload: TracksInt[];
}

async function changeSong(songInfo: TracksInt) {
    const params = {
        id: songInfo.id,
    };
    const data: CheckMusicInt = (await checkMusic(params)) as CheckMusicInt; //判断是否有版权
    if (data.success) {
        const payload = { ...songInfo } as TracksInt;

        const res: ResponseInt = (await songUrl(params)) as ResponseInt;
        if (res.code === 200) {
            payload.url = res.data[0].url;
        }
        const action: ActiveInt = {
            type: 'change_song',
            payload,
        };

        return action;
    }
}

async function changePlaySongs(songlist: TracksInt[]) {
    const action: PlaySongsPayloadInt = {
        type: 'change_playsongs',
        payload: songlist,
    };

    return action;
}

export { changeSong, changePlaySongs };
export type { ActiveInt, PlaySongsPayloadInt };
