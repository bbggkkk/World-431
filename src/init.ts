import { Dot } from './api/Dot';

import setting from '@src/setting';
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

    const list:any = new Array(size).fill(1).reduce((acc, item, idx) => {
        const $x = Math.floor(idx/x);
        const $y = idx%y;
        acc[`${$x}-${$y}-${idx}`] = new Dot(true, $x, $y);
        return acc;
    },{});
    const grid = new Simulator(setting,list);
    return grid;
    
}

export default init;