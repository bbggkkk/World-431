export const getFirstList = (x:number, y:number) => {
    const size = x*y;
    let cnt = 0;
    const DOT_LIST = new Array(size).fill(1).reduce((acc, item, idx) => {
        const $x = Math.floor(idx/x);
        const $y = idx%y;
        const tf = Math.round(Math.random()*10)%2 === 0 ? true : false;
        // const tf = cnt < 20 ? true : false;
        if(tf) cnt++;

        acc[`${$x}-${$y}`] = tf;
        return acc;
    },{});
    return DOT_LIST;
}


export const getUpdateTarget = (list:any):Array<string> => {
    const keys = Object.keys(list);
    return keys.reduce((acc:Array<string>,item:string) => {
        const arr:Array<string> = getNeighbor(item, list);
        return acc.concat(arr);
    },[]).concat(keys);

    function getNeighbor(position:string,allMap:any):Array<string>{
        const [ y, x ]:Array<number> = position.split('-').map(item => +item);
        const value:Array<string> = [
            allMap[`${y-1}-${x-1}`]   ? `${y-1}-${x-1}`    : '',
            allMap[`${y-1}-${x}`]     ? `${y-1}-${x}`      : '',
            allMap[`${y-1}-${x+1}`]   ? `${y-1}-${x+1}`    : '',
            allMap[`${y}-${x-1}`]     ? `${y}-${x-1}`      : '',
            allMap[`${y}-${x+1}`]     ? `${y}-${x+1}`      : '',
            allMap[`${y+1}-${x-1}` ]  ? `${y+1}-${x-1}`    : '',
            allMap[`${y+1}-${x}`]     ? `${y+1}-${x}`      : '',
            allMap[`${y+1}-${x+1}`]   ? `${y+1}-${x+1}`    : ''
        ].filter(item => item !== '');
        return value;
    }
}

export const getNeighbor = (position:string,allMap:any):Array<string> => {
    const [ y, x ]:Array<number> = position.split('-').map(item => +item);
        const value:Array<string> = [
            allMap[`${y-1}-${x-1}`]   ? `${y-1}-${x-1}`    : '',
            allMap[`${y-1}-${x}`]     ? `${y-1}-${x}`      : '',
            allMap[`${y-1}-${x+1}`]   ? `${y-1}-${x+1}`    : '',
            allMap[`${y}-${x-1}`]     ? `${y}-${x-1}`      : '',
            allMap[`${y}-${x+1}`]     ? `${y}-${x+1}`      : '',
            allMap[`${y+1}-${x-1}` ]  ? `${y+1}-${x-1}`    : '',
            allMap[`${y+1}-${x}`]     ? `${y+1}-${x}`      : '',
            allMap[`${y+1}-${x+1}`]   ? `${y+1}-${x+1}`    : ''
        ].filter(item => item !== '');
        return value;
}