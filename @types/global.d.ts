import { Grid } from "@src/api/Grid";

export {};

declare global {
    interface Window {
        dotList: Array<Dot>;
        world: Grid;
    }
    interface Setting {
        worldSize : Array<number>;
        tickTime : number;
        backgroundColor : string;
        unitColor : string;
    }
}
