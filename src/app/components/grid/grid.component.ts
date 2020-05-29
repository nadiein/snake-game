import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import 'konva';
import { Stage, StageConfig } from 'konva/types/Stage';
import { Layer } from 'konva/types/Layer';
import { EventType, EventVo, GridCreator } from './grid.model';
import { Snake } from '../snake/snake.model';
import { Utils, DirectionType } from '../utils/utils';

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
    level:number = 1000;
    snake:Snake = new Snake();
    tick:number = 0;
    interval:any;

    constructor(private elRef:ElementRef) { }
    
    ngOnInit() {
        this.stage = new Konva.Stage(this.config);
        //Init layers
        this.tempLayer = new Konva.Layer();
        this.drawingLayer = new Konva.Layer();
        this.gridLayer = new Konva.Layer();
        this.stage.add(this.tempLayer);
        this.stage.add(this.drawingLayer);
        this.stage.add(this.gridLayer);

        this.drawGird();
        this.drawSnake();
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

    initStageEvents() {
        this.stage.on('mousedown', e => this.dispatchEvent(e, EventType.MOUSEDOWN))
    }

    dispatchEvent(e:any, type:EventType) {
        let eventVo = new EventVo();
        eventVo.event = e;
        eventVo.type = type;
    }

    increaseDifficulty() {
        const multiplicator = 100, decreaser = 400;

        if (this.tick * multiplicator == this.level && this.level > 400) {
            this.level -= decreaser;
            this.tick = 0;
        }
    }

    increaseSnakeLength() {
        if (this.tick == 10 && this.snake.length < 10) {
            this.snake.length += 1;
        }
    }

    keyDownEvent(event:any) {
        clearInterval(this.interval);
        this.snakeMove(event.keyCode, this.snake, this.drawingLayer);
    }

    snakeMove(direction:number, snake:Snake, layer:Layer) {
        this.interval = setInterval(() => {
            if (direction == 38) {
                if (snake.y > 0) snake.y -= 30
                snake.rect.y(snake.y);
            } else if (direction == 40) {
                if (snake.y < Utils.FIELD_SIZE) snake.y += 30
                snake.rect.y(snake.y);
            } else if (direction == 37) {
                if (snake.x > 0) snake.x -= 30
                snake.rect.x(snake.x);
            } else if (direction == 39) {
                if (snake.x < Utils.FIELD_SIZE) snake.x += 30
                snake.rect.x(snake.x);
            }
            layer.batchDraw();
            this.tick++;
            this.increaseDifficulty();
            this.increaseSnakeLength();
            console.log(this.snake.length)
        }, this.level)
    }

    addFoodForSnakeOnGrid() {
        
    }

}
