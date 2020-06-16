import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import 'konva';
import { Stage, StageConfig } from 'konva/types/Stage';
import { Layer } from 'konva/types/Layer';
import { EventType, EventVo, GridCreator } from './grid.model';
import { Snake, Direction } from '../snake/snake.model';
import { Utils, DirectionType } from '../utils/utils';
import { FoodModel } from '../food/food.model';

declare const Konva:any;

@Component({
    selector: 'grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    host: { '(document:keydown)': 'keyDownEvent($event)' }
})
export class GridComponent implements OnInit {
    stage:Stage;
    config:StageConfig = {
        container: 'js-konva-stage',
        width: Utils.FIELD_SIZE,
        height: Utils.FIELD_SIZE
    };
    tempLayer:Layer;
    drawingLayer:Layer;
    gridLayer:Layer;
    foodLayer:Layer;
    level:number = 1000;
    snake:Snake = new Snake();
    snakes:Snake[] = [];
    food:FoodModel = new FoodModel();
    direction:number;
    tick:number = 0;
    interval:any;

    constructor(private elRef:ElementRef) { }
    
    ngOnInit() {
        this.stage = new Konva.Stage(this.config);
        //Init layers
        this.tempLayer = new Konva.Layer();
        this.drawingLayer = new Konva.Layer();
        this.gridLayer = new Konva.Layer();
        this.foodLayer = new Konva.Layer();
        this.stage.add(this.tempLayer);
        this.stage.add(this.drawingLayer);
        this.stage.add(this.gridLayer);
        this.stage.add(this.foodLayer);

        this.drawGird();
        this.drawSnake();
        this.drawFood();
        this.initStageEvents();
    }

    drawGird() {
        this.gridLayer.destroyChildren();
        let builder = new GridCreator();
        builder.grid.x.map(i => this.gridLayer.add(new Konva.Line(i)))
        builder.grid.y.map(i => this.gridLayer.add(new Konva.Line(i)))
        this.gridLayer.draw();
    }

    drawSnake() {
        this.snake.x = Utils.getRandomPositionCoords(20).x;
        this.snake.y = Utils.getRandomPositionCoords(20).y;
        this.drawingLayer.add(this.snake.rect);
        this.drawingLayer.batchDraw();
    }

    drawFood() {
        this.food
        this.food.x = Utils.getRandomPositionCoords(20).x;
        this.food.y = Utils.getRandomPositionCoords(20).y;
        this.foodLayer.add(this.food.rect);
        this.foodLayer.batchDraw();
    }

    initStageEvents() {
        this.stage.on('mousedown', e => this.dispatchEvent(e, EventType.MOUSEDOWN))
    }

    dispatchEvent(e:any, type:EventType) {
        let eventVo = new EventVo();
        eventVo.event = e;
        eventVo.type = type;
    }

    increaseDifficulty() {
        const decreaser = 400;

        if (this.level > 200) {
            this.level -= decreaser;
            
            clearInterval(this.interval);
            this.snakeMove(this.snake, this.drawingLayer);
        }
    }

    increaseSnakeLength() {
        let snake = this.snake;
        if (snake.length < 10) {
            snake.length += 1;
            
            let rect = new Konva.Rect();
            rect.setAttrs({ width:snake.size, height:snake.size, fill:'#ddd' })
            snake.body.push(rect);
            this.drawingLayer.add(rect);
            this.drawingLayer.batchDraw();
        }
    }

    keyDownEvent(event:any) {
        let snake = this.snake;
        if (event.keyCode == 38) {
            snake.direction = DirectionType.UP;
        } else if (event.keyCode == 40) {
            snake.direction = DirectionType.DOWN;
        } else if (event.keyCode == 37) {
            snake.direction = DirectionType.LEFT;
        } else if (event.keyCode == 39) {
            snake.direction = DirectionType.RIGHT;
        }

        clearInterval(this.interval);
        this.snakeMove(snake, this.drawingLayer);
    }

    snakeMove(snake:Snake, layer:Layer) {
        this.interval = setInterval(() => {
            if (snake.y < 0) snake.y = Utils.FIELD_SIZE;
            else if (snake.y > Utils.FIELD_SIZE - 30) snake.y = -30;
            else if (snake.x < 0) snake.x = Utils.FIELD_SIZE;
            else if (snake.x > Utils.FIELD_SIZE - 30) snake.x = -30;

            if (snake.x === this.food.x && snake.y === this.food.y) {
                snake.changeDirectionCoord.x = snake.x;
                snake.changeDirectionCoord.y = snake.y;
                this.increaseSnakeLength();
                this.foodLayer.removeChildren();
                this.drawFood();
            }
            
            if (snake.direction == DirectionType.UP) {
                snake.y -= 30;
                snake.rect.y(snake.y);
            } else if (snake.direction == DirectionType.DOWN) {
                snake.y += 30;
                snake.rect.y(snake.y);
            } else if (snake.direction == DirectionType.LEFT) {
                snake.x -= 30;
                snake.rect.x(snake.x);
            } else if (snake.direction == DirectionType.RIGHT) {
                snake.x += 30;
                snake.rect.x(snake.x);
            }
            snake.setBodyRectPosition();
            layer.batchDraw();
            this.tick++;

            if (this.tick == 5) {
                this.increaseDifficulty();
                this.tick = 0;
            }
        }, this.level)
    }

}
