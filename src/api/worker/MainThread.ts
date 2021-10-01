import { createWorker } from './Worker';
import { Simulator } from '../Simulator';

export class MainTread extends Simulator {
    $worker:Array<Function>;
    $thread:number;

    [key: string]: any;

    constructor(setting:Setting, map:any){
        super(setting, map);
        this.$thread = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 1;
        
        for(let i=0; i<this.$thread; i++){
            this.$worker.push(createWorker(this.test));
        }
    }


    test(list:Array<number>){

    }

    $balancing(list:any){
        const cnt = this.$thread;
        const divLng = Math.floor(list.length/cnt);
        const am = list.length%cnt;

        let arr = [];
        let idx = 0;
        for(let i=0; i<this.$thread; i++){
            let num = divLng;
            if(i < am)  num++;
            arr.push(list.slice(idx,idx+num));
            idx += num;
        }
        return arr.filter(item => item.length);
    }
}

