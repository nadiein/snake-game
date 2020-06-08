import { Rect } from 'konva/types/shapes/Rect';
import Konva from 'konva';

export class FoodModel {
    _rect:Rect = new Konva.Rect();
    x:number;
    y:number;
    width:number = 30;
    height:number = 30;
    direction:number;
    length:number = 1;

    get rect():Rect { return this._rect.setAttrs({x:this.x, y:this.y, width:this.width, height:this.height, fill:'#f00'}) }
}