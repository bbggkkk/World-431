import { createWorker } from './Worker';

export class ChildThread {
    $fns:any;
    $worker:any;
    $isUsing:boolean;
    [key: string]: any;

    constructor(fns:any,prop:any){
        this.$isUsing = false;
        this.$worker  = {};
        this.cw       = createWorker.bind(this);
        
        Object.keys(fns).forEach(item => {
            this[item] = this.cw(fns[item]);
        });
        Object.keys(prop).forEach(item => {
            this[item] = prop[item];
        });
        console.log(this);
    }

    $logThis(){
        console.log(this);
    }
}