import { Coords } from '../utils/utils';

export class Snake {
    length:number = 1;
    tail:Coords;
    _nose:Coords; // random start position;
    body:Coords[];
    top:number;
    left:number;
    direction:Direction;
    timer:any;

    get nose():Coords {
        return this._nose;
    }

    set nose(coords:Coords) {
        this._nose = coords;
        this.getPosition();
    }

    getPosition() {
        let baseWidth = 20 + 2; // 2 is border thick between grids. Could be removed after grid lines fix in css
        this.top = this.nose.y > 0 ? baseWidth * (this.nose.y - 1) + 1 : 1;
        this.left = this.nose.x > 0 ? baseWidth * (this.nose.x - 1) + 1 : 1;
    }

    move() {
        clearInterval(this.timer);
        this.timer = setInterval(_ => {
            if (this.direction == Direction.UP) { // Up
                this.nose.y -= 1;
            } else if (this.direction == Direction.DOWN) { // Down
                this.nose.y += 1;
            } else if (this.direction == Direction.LEFT) { // Left
                this.nose.x -= 1;
            } else if (this.direction == Direction.RIGHT) { // Right
                this.nose.x += 1;
            }
            this.getPosition()
        }, 1000)
    }
}

export enum Direction {
    UP, DOWN, LEFT, RIGHT
}