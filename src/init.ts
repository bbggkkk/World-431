import { Dot } from './api/Dot';

import setting from '@src/setting';
import { MainTread } from './api/worker/MainThread';
import { Simulator } from './api/Simulator';

const [ x, y ] = setting.worldSize;
const size     = x * y;

/**
 * @description 초기 설정 함수
 * @param {Object} setting - ./src/setting.ts 에 정의된 설정값
 * @param {Array<number>} worldSize - 월드의 크기
 * @param {number} tickTime - 월드 갱신 주기 (ms)
 */
const init = (setting:Setting) => {
    let cnt = 0;
    const list:any = new Array(size).fill(1).reduce((acc, item, idx) => {
        const $x = Math.floor(idx/x);
        const $y = idx%y;
        // const tf = Math.round(Math.random()*10)%2 === 0 && cnt < 20 ? true : false;
        const tf = Math.round(Math.random()*10)%2 === 0 ? true : false;
        // const tf = cnt < 20 ? true : false;
        // const tf = false;
        // const tf = idx < 3 ? true : false;
        if(tf) cnt++;
        acc[`${$x}-${$y}-${idx}`] = new Dot(tf, $x, $y);
        return acc;
    },{});
    const grid = new Simulator(setting, list);
    return grid;
}

export default init;