import { Coords } from '../utils/utils';

export class Snake {
    length:number = 1;
    tail:Coords;
    _nose:Coords; // random start position;
    body:Coords[];
    top:number;
    left:number;
    direction:Direction;

    get nose():Coords {
        return this._nose;
    }

    set nose(coords:Coords) {
        this._nose = coords;
        this.getPosition();
    }

    getPosition() {
        let baseWidth = 20 + 2; // 2 is border thick between grids. Could be removed after grid lines fix in css
        if (this.nose.x == 0) {
            this.left = 1;
        } else if (this.nose.y == 0) {
            this.top = 1;
        } else if (this.nose.x == 1) {
            this.left = 1;
        } else if (this.nose.y == 1) {
            this.top = 1;
        }
        console.log('setting')
        this.top = baseWidth * (this.nose.y - 1) + 1;
        this.left = baseWidth * (this.nose.x - 1) + 1;
    }
}

export enum Direction {
    UP, DOWN, LEFT, RIGHT
}