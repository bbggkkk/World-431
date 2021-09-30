export class Grid {
    x:number;
    y:number;
    map:any;
    prevMap:any;
    prevTrueMap:any;
    public lifeCount:number;


    constructor(setting:Setting, map:any){
        const [ x, y ] = setting.worldSize;

        this.x = x;
        this.y = y;
        this.map = map;
        this.prevMap = {};
        this.setMapList(Object.keys(this.map));
        this.lifeCount = this.cntLifeDot();

        // this.defineEvent();
    }

    // defineEvent() {
    //     Object.keys(this.map).forEach((item:string) => {
    //         console.log(this.map,item,this.map[item]);
    //         const key:string = item;
    //         this.map[item].addEventListener('click',this.onoff)
    //     });
    // }

    // onoff(){
    //     console.log(this);

    // }

    cntLifeDot(){
        return Object.keys(this.prevTrueMap).length;
    }

    on(target:string|Array<string>):Grid{
        this.setMapList(target,(item:string):void => {
            this.map[item].life = true;
        });
        return this;
    }
    off(target:string|Array<string>):Grid{
        this.setMapList(target,(item:string):void => {
            this.map[item].life = false;
        });
        return this;
    }
    toggle(target:string|Array<string>):Grid{
        this.setMapList(target,(item:string):void => {
            this.map[item].life = !this.map[item].life;
        });
        return this;
    }
    setMapList(target:string|Array<string>,cbk?:Function):void{
        const key = typeof target === 'string' ? [target] : target;
        if(cbk){
            key.forEach(item => {
                cbk(item);
            });
        }
        // console.log(key);
        //렌더링
        this.setPrevMap(key);
    }

    setPrevMap(key:Array<string>):void{
        key.forEach(item => {
            this.prevMap[item] = this.map[item].life;
        });
        this.prevTrueMap = Object.keys(this.prevMap).filter(item => this.map[item].life).reduce((acc:any, item:string) => {
            acc[item] = this.map[item];
            return acc;
        }, {});
        // console.log(this.prevMap);
        // this.prevTrueMap = {};
        // key.forEach(item => {
        //     this.prevMap[item] = this.map[item].life;
        //     if(this.map[item].life){
        //         this.prevTrueMap[item] = true;
        //     }
        // });
        this.lifeCount = this.cntLifeDot();
    }
}