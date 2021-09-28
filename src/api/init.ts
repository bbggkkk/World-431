/**
 * @description 초기 설정 함수
 * @param {Object} setting - ./src/setting.ts 에 정의된 설정값
 * @param {Array<number>} worldSize - 월드의 크기
 * @param {number} tickTime - 월드 갱신 주기 (ms)
 */
const init = (setting:Setting) => {
    const [ x, y ] = setting.worldSize;
    const tick     = setting.tickTime;

    const world    = new World({
        x : x,
        y : y,
        tick : tick
    });

    return world;
}

interface WorldConstructor {
    x : number;
    y : number;
    tick : number;
}
class World {

    x:number;
    y:number;
    tick:number;
    world:HTMLElement|undefined;

    constructor({ x, y, tick }:WorldConstructor){
        this.x     = x;
        this.y     = y;
        this.tick  = tick;
        this.world = this.makeWorld();

    }

    /**
     * @description 월드를 생성하고 HTML에 추가하는 함수
     */
    makeWorld(){
        const world = document.createElement('canvas');
        world.style.width = '100%';
        world.style.height = '100%';
        document.body.append(world);

        return world;
    }

    /**
     * @description 월드를 HTML에서 지우고 객체에서 제거하는 함수
     */
    destroyWorld(){
        this.world?.remove();
        this.world = undefined;
    }
}

export default init;