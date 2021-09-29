import init from './init';
import setting from './setting';
import './style/style.scss';

(function(){
    
    window.world = init(setting);
    // document.body.append(window.world.ele);
})();