import setting from '@src/setting';
const { backgroundColor, unitColor } = setting;

export class Dot {
    protected x:number;
    protected y:number;
    protected color:string;
    public    isLife:boolean;

    constructor(isLife:boolean, x:number, y:number) {
        this.x = x;
        this.y = y;
        this.life = isLife;
    }

    public set life(val:boolean) {
        this.isLife = val;
        if(val){
            this.color = unitColor;
        }else{
            this.color = backgroundColor;
        }
    }
    public get life() {
        return this.isLife;
    }
}