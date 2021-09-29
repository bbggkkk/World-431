import { Demo } from "@src/api/Demo";
import { Grid } from "@src/api/Grid";

export {};

declare global {
    interface Window {
        dotList: Array<Dot>;
        world: Simulator;
        demo: Demo;
    }
    interface Setting {
        worldSize : Array<number>;
        tickTime : number;
        backgroundColor : string;
        unitColor : string;
    }
}
