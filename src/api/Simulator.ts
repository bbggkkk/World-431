import { Grid } from "./Grid";

export class Simulator extends Grid {

    public tick:number;

    constructor(setting:Setting, map:any){
        super(setting, map);
        this.tick = setting.tickTime;
    }

    override setMapList(target:string|Array<string>,cbk:Function):void{
        const key = typeof target === 'string' ? [target] : target;
        key.forEach(item => {
            cbk(item);
        });
        //렌더링
        this.setPrevMap(key);
    }
}