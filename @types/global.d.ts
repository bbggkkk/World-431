export {};

declare global {
    interface Window {
        world: Object;
    }
    interface Setting {
        worldSize : Array<number>;
        tickTime : number;
    }
}
