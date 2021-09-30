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

    $run(fn:string,list:any){
        const workList = this.$divArray(list);
        workList.forEach((item,idx) => {
            this.$worker[idx][fn].call(this.$worker[idx],item);
        });
        return ['1'];
    }

    $divArray(list:any){
        // const $list = 

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
    // $isArray(target:any){
    //     if(Array.isArray(target)){
    //         return target;
    //     }else{
    //         return Object.keys()
    //     }
    // }
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

