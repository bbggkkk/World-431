import { Grid } from "./Grid";
import { Renderer } from "./Renderer";

export class Simulator extends Grid {

    protected interval:any;
    protected renderer:Renderer;
    public tick:number;
    constructor(setting:Setting, map:any){
        super(setting, map);
        this.tick = setting.tickTime;

    }

    start(renderer:Renderer){
        if(this.interval !== undefined)   return;
        this.renderer = renderer;
        // this.renderer.start();
        this.interval = setInterval(() => {
            console.time('interval');
            this.update();
            console.timeLog('interval',' :: to calc');
            this.renderer.render(this.prevTrueMap); 
            console.timeEnd('interval');
        }, this.tick);
    }
    stop(){
        clearInterval(this.interval);
        // this.renderer.stop();
        this.interval = undefined;
    }

    cntIsLife(position:string){
        let cnt = 0;
        const neighbor = this.getNeighbor(position);
        // console.log('neighbor ::',neighbor);
        neighbor.forEach(item => {
            if(this.prevMap[item]) cnt++;
        });
        return cnt;
    }

    getNeighbor(position:string):Array<string>{
        const [ y, x ]:Array<number> = position.split('-').map(item => +item);
        const index = (y:number,x:number):number => {
            return (y * this.y)+x;
        }
        const value:Array<string> = [
            this.map[`${y-1}-${x-1}-${index(y-1,x-1)}`] ? `${y-1}-${x-1}-${index(y-1,x-1)}`    : '',
            this.map[`${y-1}-${x}-${index(y-1,x)}`]     ? `${y-1}-${x}-${index(y-1,x)}`        : '',
            this.map[`${y-1}-${x+1}-${index(y-1,x+1)}`] ? `${y-1}-${x+1}-${index(y-1,x+1)}`    : '',
            this.map[`${y}-${x-1}-${index(y,x-1)}`]     ? `${y}-${x-1}-${index(y,x-1)}`        : '',
            this.map[`${y}-${x+1}-${index(y,x+1)}`]     ? `${y}-${x+1}-${index(y,x+1)}`        : '',
            this.map[`${y+1}-${x-1}-${index(y+1,x-1)}` ]? `${y+1}-${x-1}-${index(y+1,x-1)}`    : '',
            this.map[`${y+1}-${x}-${index(y+1,x)}`]     ? `${y+1}-${x}-${index(y+1,x)}`        : '',
            this.map[`${y+1}-${x+1}-${index(y+1,x+1)}`] ? `${y+1}-${x+1}-${index(y+1,x+1)}`    : ''
        ].filter(item => item !== '');
        return value;
    }

    getUpdateTarget():Array<string>{
        return Array.from(new Set(this.prevTrueMap.reduce((acc:Array<string>,item:string) => {
            const arr:Array<string> = this.getNeighbor(item);
            return acc.concat(arr);
        },[]).concat(this.prevTrueMap) ));
    }

    update():Simulator{
        const updateTarget:Array<string> = this.getUpdateTarget();
        // console.log(this.prevMap);
        this.setMapList(updateTarget, (item:string) => {
            const cnt = this.cntIsLife(item);
            switch (cnt){
                case 2 :
                    if(this.map[item].life === true){
                        // console.log(item, cnt, this.map[item].life, 'true');
                        this.map[item].life = true;
                    }else{
                        // console.log(item, cnt, this.map[item].life, 'false');
                        this.map[item].life = false;
                    }
                    break;
                case 3 :
                    // console.log(item, cnt, this.map[item].life, 'true');
                    this.map[item].life = true;
                    break;
                default :
                    // console.log(item, cnt, this.map[item].life, 'false');
                    this.map[item].life = false;
            }
        });
        return this;
    }
}