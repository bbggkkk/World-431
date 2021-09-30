import { Grid } from "./Grid";

export class Simulator extends Grid {

    protected interval:any;
    public tick:number;
    constructor(setting:Setting, map:any){
        super(setting, map);
        this.tick = setting.tickTime;

        // this.start();
    }

    start(){
        this.interval = setInterval(() => {
            console.time('interval');
            this.update();
            window.demo.render(this); 
            console.timeEnd('interval');
        }, this.tick);
    }
    stop(){
        clearInterval(this.interval);
    }

    cntIsLife(position:string){
        let cnt = 0;
        const neighbor = this.getNeighbor(position);
        // console.log('neighbor ::',neighbor);
        neighbor.forEach(item => {
            // if(item === undefined) return;
            // console.log('cntIsLife ::',this.prevMap[item]);
            if(this.prevMap[item])
            // if(this.prevMap[item] && this.prevMap[item].life === true)
            cnt++;
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
        return Array.from(new Set(Object.keys(this.prevTrueMap).reduce((acc:Array<string>,item:string) => {
            const arr:Array<string> = this.getNeighbor(item);
            return acc.concat(arr);
        },[]).concat(Object.keys(this.prevTrueMap)) ));
    }

    update():Simulator{
        const updateTarget:Array<string> = this.getUpdateTarget();
        // const updateTarget:Array<string> = Object.keys(this.prevMap);
        // console.log(this.prevMap);
        this.setMapList(updateTarget, (item:string) => {
            const cnt = this.cntIsLife(item);
            // if(cnt === 0 && this.map[item].life === true) console.log(this.map[item]);
            switch (cnt){
                case 2 :
                    if(this.map[item].life === true){
                        console.log(item, cnt, this.map[item].life, 'true');
                        this.map[item].life = true;
                    }else{
                        console.log(item, cnt, this.map[item].life, 'false');
                        this.map[item].life = false;
                    }
                    break;
                case 3 :
                    console.log(item, cnt, this.map[item].life, 'true');
                    this.map[item].life = true;
                    break;
                default :
                    console.log(item, cnt, this.map[item].life, 'false');
                    this.map[item].life = false;
            }
        });
        return this;
    }
}