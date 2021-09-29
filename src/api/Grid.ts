export class Grid {
    x:number;
    y:number;
    map:any;
    prevMap:any;

    constructor(setting:Setting, map:any){
        const [ x, y ] = setting.worldSize;

        this.x = x;
        this.y = y;
        this.map = map;
        this.prevMap = Object.keys(this.map).reduce((acc:any,item:string) => {
            acc[item] = this.map[item].life;
            return acc;
        },{});
    }

    on(target:string):Grid{
        this.setMapList(target,(item:string):void => {
            this.map[item].life = true;
        });
        return this;
    }
    off(target:string):Grid{
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
    setMapList(target:string|Array<string>,cbk:Function):void{
        const key = typeof target === 'string' ? [target] : target;
        key.forEach(item => {
            cbk(item);
        });
        //렌더링
        this.setPrevMap(key);
    }

    setPrevMap(key:Array<string>){
        key.forEach(item => {
            this.prevMap[item] = this.map[item].life;
        });
    }
}