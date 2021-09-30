import { createWorker } from './Worker';

export class ChildThread {
    $fns:any;
    $worker:any;
    $isUsing:boolean;
    [key: string]: any;

    constructor(fns:any,prop:any){
        this.$isUsing = false;
        this.$worker  = {};
        
        Object.keys(fns).forEach(item => {
            this[item] = fns[item];
            this.$worker[item] = createWorker(fns[item]);
        });
        Object.keys(prop).forEach(item => {
            this[item] = prop[item];
        });
    }

    $logThis(){
        console.log(this);
    }
}