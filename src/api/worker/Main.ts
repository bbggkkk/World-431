import { createWorker } from './Worker';
import { ChildThread }  from './Child';

export class MainTread {
    worker:Array<ChildThread>;
    thread:number;
    fns:Object;

    constructor(fns:Object){
        this.thread = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 1;
        this.fns    = fns;
        this.worker = [];

        for(let i=0; i<this.thread; i++){
            this.worker.push( new ChildThread(fns) );
        }
        console.log(this);
    }

    run(fn:Function,list:Array<any>){

    }

    divArray(list:Array<any>){
        const cnt = this.thread;
        
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

