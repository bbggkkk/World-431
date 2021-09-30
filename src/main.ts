import { Demo } from './api/Demo';
import init from './init';
import setting from './setting';
import './style/style.scss';

(function(){
    const [x,y] = setting.worldSize;
    const size = x*y;
    const wrap = document.querySelector('#wrapper');
    
    window.world = init(setting);
    window.demo  = new Demo(wrap as HTMLElement)

    for(let i=0; i<size; i++){

        const $x = Math.floor(i/x);
        const $y = i%y;

        const tmp = document.createElement('div');
        tmp.setAttribute('data-idx',`${$x}-${$y}-${i}`);
        tmp.addEventListener('click',() => { window.world.toggle(`${$x}-${$y}-${i}`); window.demo.render(window.world); } );
        wrap?.append(tmp);
    }

    // window.world.start();

})();