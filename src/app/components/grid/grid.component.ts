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
    level:number = 2000;
    snake:Snake = new Snake();
    tick:number;

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
        // let width = Utils.FIELD_SIZE;
        // let height = Utils.FIELD_SIZE;
        // let step = Utils.GRID_SIZE;
        // let linesOnAxisX = Math.ceil(width - step / step);
        // let linesOnAxisY = Math.ceil(height - step / step);
        // let stroke = '#ddd';
        // let x, y;
        // for (let i = 0; i < linesOnAxisX; i++) {
        //     x = new Konva.Line({
        //         points: [Math.ceil(i * step), 0, Math.ceil(i * step), height],
        //         stroke: stroke,
        //         strokeWidth: 1,
        //     })
        //     this.gridLayer.add(x);
        // }

        // for (let j = 0; j < linesOnAxisY; j++) {
        //     y = new Konva.Line({
        //         points: [0, Math.ceil(j * step), width, Math.ceil(j * step)],
        //         stroke: stroke,
        //         strokeWidth: 1,
        //     })
        //     this.gridLayer.add(y);
        // }
        // console.log(this.gridLayer)
        let builder = new GridCreator();
        let x = new Konva.Line(builder.grid.x);
        let y = new Konva.Line(builder.grid.y)
        console.log(this.gridLayer)
        this.gridLayer.add(x);
        this.gridLayer.add(y);
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

    increaseDifficulty(tick:number, defaultValue:number):number {
        return
    }

    keyDownEvent(event:any) {
        this.snakeMove(event.keyCode, this.snake, this.drawingLayer);
    }

    snakeMove(direction:number, snake:Snake, layer:Layer) {
        setInterval(() => {
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
        }, this.level)
    }

    addFoodForSnakeOnGrid() {
        
    }

}
