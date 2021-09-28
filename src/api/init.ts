/**
 * @description 초기 설정 함수
 * @param {Object} setting - ./src/setting.ts 에 정의된 설정값
 * @param {Array<number>} worldSize - 월드의 크기
 * @param {number} tickTime - 월드 갱신 주기 (ms)
 */
const init = (setting:Setting) => {

    const world    = new World(setting);

    return world;
}

class World {

    x:number;
    y:number;
    w:string;
    h:string;
    tick:number;
    world:HTMLElement|undefined;
    backgroundColor:string;
    unitColor:string;

    constructor(setting:Setting){
        const [ x, y ] = setting.worldSize;
        const tick     = setting.tickTime;

        this.x     = x;
        this.y     = y;
        this.w     = '100%';
        this.h     = '100%';
        this.tick  = tick;
        this.backgroundColor = setting.backgroundColor;
        this.unitColor       = setting.unitColor;
        this.world = this.makeWorld();

    }

    /**
     * @description 월드를 생성하고 HTML에 추가하는 함수
     */
    makeWorld(){
        const world = document.createElement('canvas');
        this.setWorldStyle(world);
        world.id = 'world';
        document.body.append(world);
        return world;
    }

    /**
     * @description 월드에 스타일을 적용하는 함수
     */
    setWorldStyle(world:HTMLElement){
        world.style.width = this.w;
        world.style.height = this.h;
        world.style.backgroundColor = this.backgroundColor;
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