import { Grid } from "./Grid";

export class Simulator extends Grid {

    protected interval:any;
    public tick:number;
    constructor(setting:Setting, map:any){
        super(setting, map);
        this.tick = setting.tickTime;

        this.start();
    }

    start(){
        this.interval = setInterval(() => {
            this.update();
            window.demo.render(this);
        }, this.tick);
    }
    stop(){
        clearInterval(this.interval);
    }

    cntIsLife(position:string){
        let cnt = 0;
        const neighbor = this.getNeighbor(position);
        neighbor.forEach(item => {
            if(item === undefined) return;
            if(this.map[item] && this.map[item].life === true)
            cnt++;
        });
        return cnt;
    }

    getNeighbor(position:string):Array<string>{
        const [ y, x ]:Array<number> = position.split('-').map(item => +item);
        const index = (y:number,x:number):number => {
            return (y * this.y)+x;
        }
        return [
            this.map[`${y-1}-${x-1}-${index(y-1,x-1)}`] ? `${y-1}-${x-1}-${index(y-1,x-1)}`    : '',
            this.map[`${y-1}-${x}-${index(y-1,x)}`]     ? `${y-1}-${x}-${index(y-1,x)}`        : '',
            this.map[`${y-1}-${x+1}-${index(y-1,x+1)}`] ? `${y-1}-${x+1}-${index(y-1,x+1)}`    : '',
            this.map[`${y}-${x-1}-${index(y,x-1)}`]     ? `${y}-${x-1}-${index(y,x-1)}`        : '',
            this.map[`${y}-${x+1}-${index(y,x+1)}`]     ? `${y}-${x+1}-${index(y,x+1)}`        : '',
            this.map[`${y+1}-${x-1}-${index(y+1,x-1)}` ]? `${y+1}-${x-1}-${index(y+1,x-1)}`    : '',
            this.map[`${y+1}-${x}-${index(y+1,x)}`]     ? `${y+1}-${x}-${index(y+1,x)}`        : '',
            this.map[`${y+1}-${x+1}-${index(y+1,x+1)}`] ? `${y+1}-${x+1}-${index(y+1,x+1)}`    : ''
        ]
    }

    getUpdateTarget():Array<string>{
        return Array.from(new Set(Object.keys(this.prevTrueMap).reduce((acc:Array<string>,item:string) => {
            const arr:Array<string> = this.getNeighbor(item).filter(item => item !== '');
            return acc.concat(arr);
        },[])));
    }

    update():Simulator{
        const updateTarget:Array<string> = Object.keys(this.prevMap);
        this.setMapList(updateTarget, (item:string) => {
            const cnt = this.cntIsLife(item!);
            // if(cnt === 0 && this.map[item].life === true) console.log(this.map[item]);
            switch (cnt){
                case 2 :
                    if(this.map[item!].life === true){
                        this.map[item].life = true;
                    }else{
                        this.map[item].life = false;
                    }
                    break;
                case 3 :
                    this.map[item].life = true;
                    break;
                default :
                    this.map[item].life = false;
            }
            // if(this.map[item].life === true){
            //     this.map[item].life = false;
            // }else{
            //     this.map[item].life = true;
            // }
        });
        return this;
    }
}