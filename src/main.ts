import { Renderer } from './api/Renderer';
import { createWorker } from './api/worker/Worker';

import setting from './setting';
import './style/style.scss';

import { getFirstList } from './api/InitFn';
import { initWorker }   from './api/worker/Worker';

(async function(){
    const [x,y] = setting.worldSize;
    const size = x*y;
    const wrap = document.querySelector('#wrapper');

    // window.world    = init(setting);
    // window.renderer = new Renderer(wrap as HTMLElement, window.world);
    // window.world.start(window.renderer);

    const list = getFirstList(x, y);
    const worker = initWorker((list:Array<number>) => { return list; });
    worker([1,2,3,4,5,6,7,8,9]).then(data => console.log(data) );
})();