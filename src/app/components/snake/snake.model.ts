import { Coords } from '../utils/utils';

export class Snake {
    length:number = 1;
    tail:Coords;
    _head:Coords; // random start position;
    body:Coords[];
    posTop:number;
    posLeft:number;
    currentMovingDirection:Direction;

    get head():Coords {
        return this._head;
    }

    set head(coords:Coords) {
        this._head = coords;
        this.getPosition();
    }

    getPosition() {
        let baseWidth = 20 + 2; // 2 is border thick between grids. Could be removed after grid lines fix in css
        this.posTop = this.head.y > 0 ? baseWidth * (this.head.y - 1) + 1 : 1;
        this.posLeft = this.head.x > 0 ? baseWidth * (this.head.x - 1) + 1 : 1;
    }

    move() {
        if (this.currentMovingDirection == Direction.UP) { // Up
            this.head.y -= 1;
        } else if (this.currentMovingDirection == Direction.DOWN) { // Down
            this.head.y += 1;
        } else if (this.currentMovingDirection == Direction.LEFT) { // Left
            this.head.x -= 1;
        } else if (this.currentMovingDirection == Direction.RIGHT) { // Right
            this.head.x += 1;
        }
        this.getPosition();
    }
}

export enum Direction {
    UP, DOWN, LEFT, RIGHT
}