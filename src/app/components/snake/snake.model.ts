import 'konva';
import { Rect } from 'konva/types/shapes/Rect';

declare const Konva:any;

export class Snake {
    _rect:Rect = new Konva.Rect();
    _x:number;
    _y:number;
    width:number = 30;
    height:number = 30;
    direction:number;
    length:number = 1;

    get rect():Rect { return this._rect.setAttrs({x:this._x, y:this._y, width:this.width, height:this.height, fill:'#ddd'}) }
    
    get x():number { return this._x }
    set x(value:number) { this._x = value }
    get y():number { return this._y }
    set y(value:number) { this._y = value }
}

export enum Direction {
    UP, DOWN, LEFT, RIGHT
}