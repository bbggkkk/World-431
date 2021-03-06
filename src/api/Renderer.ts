import { ContextExclusionPlugin } from "node_modules/webpack/types";
import { MainTread } from "./worker/MainThread";

export class Renderer {
    world:MainTread;
    wrapper:HTMLElement;
    canvas:HTMLCanvasElement;
    resizeObserver:ResizeObserver;
    isObserving:Boolean;
    canvasWidth:number;
    canvasHeight:number;
    scale:number;
    lifeSize:number;
    lifeWidth:number;
    lifeHeight:number;
    ctx:CanvasRenderingContext2D;
    resizing:boolean;

    prevMap:Array<string>;

    constructor(wrapper:HTMLElement, sim:MainTread){
        this.wrapper = wrapper;
        this.isObserving = false;
        this.world   = sim;
        this.scale   = 4;
        this.prevMap = [];
        this.resizing = false;
        
        this.initCanvas();
        this.onResize();
    }
    
    initCanvas(){

        this.canvas  = document.createElement('canvas');
        this.canvas.style.width  = '100vmin';
        this.canvas.style.height = '100vmin';
        this.canvas.style.imageRendering = 'pixelated'
        this.ctx     = this.canvas.getContext('2d')!;
        this.ctx.fillStyle = this.world.color;
        // this.setCanvasSize();
        this.wrapper.append(this.canvas);
    }

    render(map:Array<string>,reset:boolean = false){
        if(this.resizing && !reset) return;
        const [ on, off ] = this.diff(reset ? [] : this.prevMap, map);

        on.forEach(item => {
            const [y,x] = item.split('-');
            this.draw(+x,+y);
        });
        off.forEach(item => {
            const [y,x] = item.split('-');
            this.erase(+x,+y);
        });

        this.prevMap   = map; 
    }
    diff(a:Array<string>, b:Array<string>){
        const onList  = b.filter(item => !a.includes(item) );
        const offList = a.filter(item => !b.includes(item) );

        return [onList,offList];
    }

    draw(x:number, y:number){
        const sz = this.lifeSize;
        this.ctx.fillRect(x*sz,y*sz,sz,sz);
    }
    erase(x:number, y:number){
        // const offset = 0.5;
        const sz = this.lifeSize;
        this.ctx.clearRect(x*sz,y*sz,sz,sz);
    }

    setLifeSize(){
        const w = +window.getComputedStyle(this.wrapper).width.replace('px','');
        this.lifeSize = 1;
    }

    onResize(){
        const target = this.wrapper;
        const obs    = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                this.resizing = true;
                this.setCanvasSize();
                this.render(this.world.prevTrueMap,true);
                this.resizing = false;
            });
        });
        obs.observe(target);

        this.resizeObserver = obs;
        this.isObserving = true;
    }
    offResize(){
        const target = this.wrapper;
        if(this.resizeObserver){
            this.resizeObserver.unobserve(target);
            this.isObserving = false;
        }
    }
    setCanvasSize(){
        const w = +window.getComputedStyle(this.wrapper).width.replace('px','');
        const h = +window.getComputedStyle(this.wrapper).height.replace('px','');
        // const pixelRatio  = window.devicePixelRatio;

        // this.canvasWidth  = w*this.scale*pixelRatio;
        // this.canvasHeight = h*this.scale*pixelRatio;
        this.canvas.setAttribute('width', ""+this.world.x);
        this.canvas.setAttribute('height', ""+this.world.y);
        // this.canvas.setAttribute('width', ""+this.canvasWidth);
        // this.canvas.setAttribute('height', ""+this.canvasHeight);

        this.setLifeSize();
    }

}