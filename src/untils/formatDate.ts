/**
 Created by 兰舰 on 2019/12/6  16:26
 */
// 时间戳转换为 时间格式
export default function formatDate(value: number) {
    if (!value) {
        return '';
    }
    if (value.toString().length === 10) {
        value = value * 1000;
    }
    const nowTimes = new Date().getTime();
    if (nowTimes - value < 60 * 1000) {
        if (Math.floor((nowTimes - value) / 1000) < 5) {
            return '刚刚';
        } else {
            return Math.floor((nowTimes - value) / 1000) + '秒前';
        }
    }
    if (nowTimes - value < 60 * 60 * 1000) {
        return Math.floor((nowTimes - value) / (60 * 1000)) + '分钟前';
    }
    if (nowTimes - value < 24 * 60 * 60 * 1000) {
        return Math.floor((nowTimes - value) / (60 * 60 * 1000)) + '小时前';
    }
    const date = new Date(value);
    const dateNumFun = (num: number) => (num < 10 ? `0${num}` : num);
    const [Y, M, D, h, m, s] = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        dateNumFun(date.getHours()),
        dateNumFun(date.getMinutes()),
        dateNumFun(date.getSeconds()),
    ];
    if (date.getFullYear() !== new Date().getFullYear()) {
        return `${Y}年${M}月${D}日 ${h}:${m}`;
    } else {
        return `${M}月${D}日 ${h}:${m}`;
    }
}
