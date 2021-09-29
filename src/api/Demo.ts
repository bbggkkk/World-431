import setting from "@src/setting";
import { Simulator } from "./Simulator";

export class Demo {
    wrapper:HTMLElement;
    children:NodeList;
    constructor(wrapper:HTMLElement){
        this.wrapper = wrapper;
        this.children = this.wrapper.querySelectorAll(':scope > div');
        const [x,y] = setting.worldSize;
        this.wrapper.style.gridTemplate = `repeat(${x},${100/x}%)/repeat(${y},${100/y}%)`;
    }

    render(sim:Simulator){
        const mp = sim.map;
        const wd = sim.prevMap;
        
        Object.keys(wd).forEach(item => {
            const ele = this.wrapper.querySelector(`[data-idx="${item}"]`) as HTMLElement;
            if(wd[item]){
                ele.style.backgroundColor = mp[item].color;
            }else{
                ele.style.backgroundColor = mp[item].color;
            }
        });
    }
}