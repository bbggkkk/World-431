export const createWorker = (fn:Function) => {
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
        // worker.onerror = ({data}) => {
        //     reject(data);
        // }

        return (data:any) => new Promise((res, rej) => {
            resolve = res;
            reject  = rej;
            worker.postMessage(data);
        });
    }else{
        return (data:any) => fn(data);
    }
}