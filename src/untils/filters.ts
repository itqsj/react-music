export const getTime = (time: any, retain: boolean) => {
    if (!time) return '00:00';
    let minute: any = Math.floor(time / 60);
    let second: any = time % 60;
    if (retain) {
        second = Math.floor(second);
    }
    minute = minute >= 10 ? minute : `0${minute}`;
    second = second >= 10 ? second : `0${second}`;
    return `${minute}:${second}`;
};
// const compareSize = (number1, number2) => {
//     let minute1 = number1.split(':')[0];
//     let minute2 = number2.split(':')[0];
//     let second1 = number1.split(':')[1];
//     let second2 = number2.split(':')[1];
//     console.log('10:22.2354' < '01:02.2352')
// }

export interface LyricInt {
    time: string;
    lyric: string;
}
export const transitionLyricArray = (songLyric: string) => {
    const songTimeLyric: Array<string> = songLyric.split('\n');
    const lyricArr: Array<LyricInt> = [];
    let lyricEndArr: Array<LyricInt> = [];
    songTimeLyric.forEach((timeLyric) => {
        const timeLyricArr = timeLyric.split(']');
        if (timeLyricArr.length === 2) {
            if (
                lyricEndArr.length &&
                timeLyricArr[0].slice(1) > lyricEndArr[0].time
            ) {
                lyricArr.push(...lyricEndArr);
                lyricEndArr = [];
            }
            const timeLyricObj = {
                time: timeLyricArr[0].slice(1),
                lyric: timeLyricArr[1],
            };
            lyricArr.push(timeLyricObj);
        } else if (timeLyricArr.length === 3) {
            const nowtimeLyricObj = {
                time: timeLyricArr[1].slice(1),
                lyric: timeLyricArr[2],
            };
            const endTimeLyricObj = {
                time: timeLyricArr[0].slice(1),
                lyric: timeLyricArr[2],
            };
            lyricArr.push(nowtimeLyricObj);
            lyricEndArr.push(endTimeLyricObj);
        } else if (timeLyricArr.length === 0) {
        }
    });
    console.log(lyricArr);
    return lyricArr;
};
