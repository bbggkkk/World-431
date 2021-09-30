import { Grid } from "./Grid";
import { Demo } from "./Demo";
import { MainTread } from "./worker/Main";

export class Simulator extends Grid {

    protected interval:any;
    protected renderer:Demo;
    protected worker:MainTread;
    protected thread:number;
    public tick:number;
    constructor(setting:Setting, map:any){
        super(setting, map);
        this.tick = setting.tickTime;

        // this.worker = new MainTread({
        //     start : this.start,
        //     stop  : this.stop,
        //     cntIsLife : this.cntIsLife,
        //     getNeighbor : this.getNeighbor,
        //     getUpdateTarget : this.getUpdateTarget,
        //     update : this.update,
        //     cntLifeDot : this.cntLifeDot,
        //     on : this.on,
        //     off : this.off,
        //     toggle : this.toggle,
        //     setMapList : this.setMapList,
        //     setPrevMap : this.setPrevMap,
        // },{
        //     x : this.x,
        //     y : this.y,
        //     map : this.map,
        //     prevMap : this.prevMap,
        //     prevTrueMap : this.prevTrueMap,
        //     lifeCount : this.lifeCount,

        //     interval : this.interval,
        //     renderer : this.renderer,
        //     tick : this.tick,
        // });

        // this.thread = this.worker.$thread;
    }

    start(demo:Demo){
        if(this.interval !== undefined)   return;
        this.renderer = demo;
        this.renderer.start();
        this.interval = setInterval(() => {
            console.time('interval');
            this.update();
            // this.renderer.render(this); 
            console.timeEnd('interval');
        }, this.tick);
    }
    stop(){
        clearInterval(this.interval);
        this.renderer.stop();
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
        return Array.from(new Set( Object.keys(this.prevTrueMap).reduce((acc:Array<string>,item:string) => {
            const arr:Array<string> = this.getNeighbor(item);
            return acc.concat(arr);
        },[]).concat( Object.keys(this.prevTrueMap) ) ));
    }

    update(){
        // const updateTarget:Array<string> = this.worker.$run('getUpdateTarget',Object.keys(this.prevTrueMap));
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

    // start(demo:Demo){
    //     if(this.interval !== undefined)   return;
    //     this.renderer = demo;
    //     this.renderer.start();
    //     this.interval = setInterval(() => {
    //         console.time('interval');
    //         this.update();
    //         // this.renderer.render(this); 
    //         console.timeEnd('interval');
    //     }, this.tick);
    // }
    // stop(){
    //     clearInterval(this.interval);
    //     this.renderer.stop();
    //     this.interval = undefined;
    // }

    // cntIsLife(position:string){
    //     let cnt = 0;
    //     const neighbor = this.getNeighbor(position);
    //     // console.log('neighbor ::',neighbor);
    //     neighbor.forEach(item => {
    //         if(this.prevMap[item]) cnt++;
    //     });
    //     return cnt;
    // }

    // getNeighbor(position:string):Array<string>{
    //     const [ y, x ]:Array<number> = position.split('-').map(item => +item);
    //     const index = (y:number,x:number):number => {
    //         return (y * this.y)+x;
    //     }
    //     const value:Array<string> = [
    //         this.map[`${y-1}-${x-1}-${index(y-1,x-1)}`] ? `${y-1}-${x-1}-${index(y-1,x-1)}`    : '',
    //         this.map[`${y-1}-${x}-${index(y-1,x)}`]     ? `${y-1}-${x}-${index(y-1,x)}`        : '',
    //         this.map[`${y-1}-${x+1}-${index(y-1,x+1)}`] ? `${y-1}-${x+1}-${index(y-1,x+1)}`    : '',
    //         this.map[`${y}-${x-1}-${index(y,x-1)}`]     ? `${y}-${x-1}-${index(y,x-1)}`        : '',
    //         this.map[`${y}-${x+1}-${index(y,x+1)}`]     ? `${y}-${x+1}-${index(y,x+1)}`        : '',
    //         this.map[`${y+1}-${x-1}-${index(y+1,x-1)}` ]? `${y+1}-${x-1}-${index(y+1,x-1)}`    : '',
    //         this.map[`${y+1}-${x}-${index(y+1,x)}`]     ? `${y+1}-${x}-${index(y+1,x)}`        : '',
    //         this.map[`${y+1}-${x+1}-${index(y+1,x+1)}`] ? `${y+1}-${x+1}-${index(y+1,x+1)}`    : ''
    //     ].filter(item => item !== '');
    //     return value;
    // }

    // getUpdateTarget():Array<string>{
    //     return Array.from(new Set(Object.keys(this.prevTrueMap).reduce((acc:Array<string>,item:string) => {
    //         const arr:Array<string> = this.getNeighbor(item);
    //         return acc.concat(arr);
    //     },[]).concat(Object.keys(this.prevTrueMap)) ));
    // }

    // update():Simulator{
    //     const updateTarget:Array<string> = this.getUpdateTarget();
    //     // console.log(this.prevMap);
    //     this.setMapList(updateTarget, (item:string) => {
    //         const cnt = this.cntIsLife(item);
    //         switch (cnt){
    //             case 2 :
    //                 if(this.map[item].life === true){
    //                     // console.log(item, cnt, this.map[item].life, 'true');
    //                     this.map[item].life = true;
    //                 }else{
    //                     // console.log(item, cnt, this.map[item].life, 'false');
    //                     this.map[item].life = false;
    //                 }
    //                 break;
    //             case 3 :
    //                 // console.log(item, cnt, this.map[item].life, 'true');
    //                 this.map[item].life = true;
    //                 break;
    //             default :
    //                 // console.log(item, cnt, this.map[item].life, 'false');
    //                 this.map[item].life = false;
    //         }
    //     });
    //     return this;
    // }
}