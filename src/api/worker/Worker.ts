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
    const thread  = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 1;
    const workers = new Array(thread).fill(0).map(() => createWorker(fn));
    return (data:any) => new Promise((res, rej) => {
        const datas    = balancing(data);
        const promises = workers.map((item, idx) => { return item(datas[idx]); } );
        res(Promise.all(promises).then(data => { console.log(data); return data.flat(); } ));
    });
}

export const balancing = (list:any) => {
    const thread = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 1;

    const entries = Array.isArray(list) ? list : Object.entries(list);

    const cnt = thread;
    const divLng = Math.floor(entries.length/cnt);
    const am = entries.length%cnt;

    let arr = [];
    let idx = 0;
    if(Array.isArray(list)){
        for(let i=0; i<thread; i++){
            let num = divLng;
            if(i < am)  num++;
            arr.push(entries.slice(idx,idx+num));
            idx += num;
        }
    }else{
        for(let i=0; i<thread; i++){
            let num = divLng;
            if(i < am)  num++;
            arr.push(Object.fromEntries(entries.slice(idx,idx+num)));
            idx += num;
        }
    }
    return arr.filter(item => (Array.isArray(item) && item.length) || !Array.isArray(item));
}