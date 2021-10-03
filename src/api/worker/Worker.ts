export const createWorker = (fn:Function) => {
    const fns = fn;
    const isWorker:boolean = (Blob && URL && URL.createObjectURL) ? true : false;
    if(isWorker){
        const blob = new Blob([`onmessage = ({data}) => {
            postMessage((${fn})(data));
        }`], { type : 'text/javascript' } );
        const url  = URL.createObjectURL(blob);
        const worker = new Worker(url);

        let resolve:any, reject:any;
        worker.onmessage = ({data}) => {
            resolve(data);
        }

        return (data:any) => new Promise((res, rej) => {
            resolve = res;
            reject  = rej;
            worker.postMessage(data);
        });
    }else{
        return (data:any) => fn(data);
    }
}

export const initWorker = (fn:Function) => {
    const thread  = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;
    const workers = new Array(thread).fill(createWorker(fn));
    console.log(workers);
    return (data:any) => new Promise((res, rej) => {
        const datas    = balancing(data);
        const promises = [];
        for(let i=0; i<thread; i++){
            promises.push(workers[i](datas[i]));
        }
        // const promises = workers.map((item, idx) => { console.log(item); return item(datas[idx]); } );
        console.log(promises);
        // Promise.all(promises).then(data => console.log(data) );
    });
}

export const balancing = (list:any) => {
    const thread = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;
    const cnt = thread;
    const divLng = Math.floor(list.length/cnt);
    const am = list.length%cnt;

    let arr = [];
    let idx = 0;
    for(let i=0; i<thread; i++){
        let num = divLng;
        if(i < am)  num++;
        arr.push(list.slice(idx,idx+num));
        idx += num;
    }
    return arr.filter(item => item.length);
}