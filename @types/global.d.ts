import { Renderer } from "@src/api/Renderer";
import { Grid } from "@src/api/Grid";

export {};

declare global {
    interface Window {
        dotList: Array<Dot>;
        world: Simulator;
        renderer: Renderer;
    }
    interface Setting {
        worldSize : Array<number>;
        tickTime : number;
        backgroundColor : string;
        unitColor : string;
    }
}
