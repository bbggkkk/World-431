export const getFirstList = (x:number, y:number) => {
    const size = x*y;
    const DOT_LIST:Array<boolean> = new Array(size).fill(1).reduce((acc, item, idx) => {
        const $x = Math.floor(idx/x);
        const $y = idx%y;
        const tf = Math.round(Math.random()*10)%2 === 0 ? true : false;
        acc[`${$x}-${$y}`] = tf;
        return acc;
    },{});
    return DOT_LIST;
}