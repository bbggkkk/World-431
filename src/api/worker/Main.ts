import { createWorker } from './Worker';
import { ChildThread }  from './Child';

export class MainTread {
    $worker:Array<ChildThread>;
    $thread:number;
    $fns:any;
    $prop:any;

    constructor(fns:any,prop:any){
        this.$thread = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 1;
        this.$fns    = fns;
        this.$prop   = prop;
        this.$worker = [];

        for(let i=0; i<this.$thread; i++){
            this.$worker.push( new ChildThread(fns, prop) );
        }
    }

    $test(){
        this.$worker.forEach(item => {
            item.$logThis();
        })
    }

    $run(fn:Function,list:Array<any>){
        const workList = this.$divArray(list);
        this.$worker.forEach(item => {
            // item[fn](list);
        })
    }

    $divArray(list:Array<any>){
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
        return arr;
    }
}

// const threadCount = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;
// const wl          = [];

// for(let i=0; i<threadCount; i++){
//     const worker = new Worker( new URL('./Child.ts', import.meta.url) );

//     wl.push(worker);
// }
// console.log(wl);


// onmessage = (e) => {
//     console.log(e);
// }

