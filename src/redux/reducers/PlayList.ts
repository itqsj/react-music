import { TracksInt } from '@/types/playList';
import { fromJS } from 'immutable';

interface ActionInt {
    type: string;
    payload?: any;
}
interface PrevStateInt {
    currentSong: TracksInt;
    currentPlaySongs: TracksInt[];
}

export const PlayListReducer = (
    prevState: PrevStateInt = {
        currentSong: {} as TracksInt,
        currentPlaySongs: [],
    },
    action: ActionInt,
) => {
    const { type, payload } = action;
    const newState = fromJS(prevState);
    switch (type) {
        case 'change_song':
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return newState.set('currentSong', payload).toJS();
        case 'change_playsongs':
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return newState.set('currentPlaySongs', payload).toJS();
        default:
            return prevState;
    }
};
