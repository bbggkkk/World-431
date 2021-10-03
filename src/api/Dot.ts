import setting from '@src/setting';
const { backgroundColor, unitColor } = setting;

export class Dot {
    protected x:number;
    protected y:number;
    protected color:string;
    public    isLife:boolean;
    public    wsLife:boolean;

    constructor(isLife:boolean, x:number, y:number) {
        this.x = x;
        this.y = y;
        this.life = isLife;
        this.wasLife = !isLife;
    }

    public set life(val:boolean) {
        if(this.isLife !== val){
            this.wsLife = !this.wsLife;
        }
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

    public set wasLife(val:boolean) {
        this.wsLife = val;
    }
    public get wasLife() {
        return this.wsLife;
    }
}