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
    // const trueMap = Object.keys(list).filter(item => list[item]);
    const worker = initWorker(getUpdateTarget);
    console.time('log start');
    worker(list).then(data => console.log(data) );
    console.timeEnd('log start');
})();