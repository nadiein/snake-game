import 'konva';
import { Rect } from 'konva/types/shapes/Rect';

declare const Konva:any;

export class Snake {
    _rect:Rect = new Konva.Rect();
    _x:number;
    _y:number;
    size:number = 30;
    direction:number;
    length:number = 0;
    _body:Rect[] = [];

    get rect():Rect { return this._rect.setAttrs({x:this._x, y:this._y, width:this.size, height:this.size, fill:'#ddd'}) }

    get body():Rect[] {
        for (let i = 0; i < this.length; i++) {
            let rect = new Konva.Rect();
            rect.setAttrs({width:this.size, height:this.size, fill:'#ddd'})

            if (this.direction === Direction.UP) rect.setAttrs({ x: this.x, y: this.y + i*this.size })
            else if (this.direction === Direction.DOWN) rect.setAttrs({ x: this.x, y: this.y - i*this.size })
            else if (this.direction === Direction.LEFT) rect.setAttrs({ x: this.x + i*this.size, y: this.y })
            else if (this.direction === Direction.RIGHT) rect.setAttrs({ x: this.x - i*this.size, y: this.y })

            this._body.push(rect)
        }

        return this._body;
    }
    
    get x():number { return this._x }
    set x(value:number) { this._x = value }
    get y():number { return this._y }
    set y(value:number) { this._y = value }
}

export enum Direction {
    UP, DOWN, LEFT, RIGHT
}