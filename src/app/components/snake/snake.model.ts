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
    changeDirectionCoord:{x:number, y:number} = {x:0, y:0};
    body:Rect[] = [];

    get rect():Rect { return this._rect.setAttrs({ x:this._x, y:this._y, width:this.size, height:this.size, fill:'#ddd' }) }
    
    get x():number { return this._x }
    set x(value:number) { this._x = value }
    get y():number { return this._y }
    set y(value:number) { this._y = value }

    setBodyRectPosition() {
        for (let i = 0; i < this.body.length; i++) {
            if (this.direction === Direction.UP) this.body[i].setAttrs({ x: this.x, y: this.y + i*this.size })
            else if (this.direction === Direction.DOWN) this.body[i].setAttrs({ x: this.x, y: this.y - i*this.size })
            else if (this.direction === Direction.LEFT) this.body[i].setAttrs({ x: this.x + i*this.size, y: this.y })
            else if (this.direction === Direction.RIGHT) this.body[i].setAttrs({ x: this.x - i*this.size, y: this.y })
        }
    }
}

export enum Direction {
    UP, DOWN, LEFT, RIGHT
}