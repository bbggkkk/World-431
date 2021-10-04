import { Renderer } from './api/Renderer';
import { createWorker } from './api/worker/Worker';

import setting from './setting';
import './style/style.scss';

import { getFirstList, getUpdateTarget } from './api/InitFn';
import { initWorker }   from './api/worker/Worker';

(async function(){
    const [x,y] = setting.worldSize;
    const size = x*y;
    const wrap = document.querySelector('#wrapper');

    // window.world    = init(setting);
    // window.renderer = new Renderer(wrap as HTMLElement, window.world);
    // window.world.start(window.renderer);

    const list = getFirstList(x, y);
    const trueList = Object.keys(list).reduce((acc:any, item:string) => {
        if(list[item]){
            acc[item] = true;
        }
        return acc;
    },{});
    // const trueMap = Object.keys(list).filter(item => list[item]);
    const worker = initWorker(getUpdateTarget);
    console.time('log start');
    await worker( trueList );
    console.timeEnd('log start');
})();