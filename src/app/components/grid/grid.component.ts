import { Component, OnInit, HostListener } from '@angular/core';
import { GridCreator } from './grid.model';
import { Snake, Direction } from '../snake/snake.model';
import { Utils } from '../utils/utils';

@Component({
    selector: 'grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

    grid:GridCreator;
    snake:Snake;

    constructor() { }

    ngOnInit() {
        this.grid = this.createGrid(30);
        this.createSnakeStartPosition();
        console.log(this.snake)
    }

    createGrid(cells:number):GridCreator {
        return GridCreator.buildGrid(cells);
    }

    createSnakeStartPosition():Snake {
        this.snake = new Snake();
        this.snake.nose = Utils.getRandomPositionCoords(29);
        return this.snake;
    }

    @HostListener('window:keyup', ['$event'])
    onKeyUp(event) {
        if (event.keyCode == 38) { // Up
            this.snake.nose.y -= 1;
            this.snake.direction = Direction.UP;
        } else if (event.keyCode == 40) { // Down
            this.snake.nose.y += 1;
            this.snake.direction = Direction.DOWN;
        } else if (event.keyCode == 37) { // Left
            this.snake.nose.x -= 1;
            this.snake.direction = Direction.LEFT;
        } else if (event.keyCode == 39) { // Right
            this.snake.nose.x += 1;
            this.snake.direction = Direction.RIGHT;
        }
        this.snake.getPosition();
    }

}
