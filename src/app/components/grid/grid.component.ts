import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import 'konva';
import { Stage, StageConfig } from 'konva/types/Stage';
import { Layer } from 'konva/types/Layer';
import { EventType, EventVo } from './grid.model';
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
    tick:any;

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
        let width = Utils.FIELD_SIZE;
        let height = Utils.FIELD_SIZE;
        let step = Utils.GRID_SIZE;
        let linesOnAxisX = Math.ceil(width - step / step);
        let linesOnAxisY = Math.ceil(height - step / step);
        let stroke = '#ddd';

        for (let i = 0; i < linesOnAxisX; i++) {
            this.gridLayer.add(new Konva.Line({
                points: [Math.ceil(i * step), 0, Math.ceil(i * step), height],
                stroke: stroke,
                strokeWidth: 1,
            }));
        }

        for (let j = 0; j < linesOnAxisY; j++) {
            this.gridLayer.add(new Konva.Line({
                points: [0, Math.ceil(j * step), width, Math.ceil(j * step)],
                stroke: stroke,
                strokeWidth: 1,
            }));
        }

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
        this.mouseDownEvent(eventVo);
    }

    mouseDownEvent(event:EventVo) {
        // console.log(event)
    }

    // activate if previous event != current evenet || current event == null

    increaseDifficulty(previousTime:any) {
        // TODO: finish methood to increase difficulty
    }

    keyDownEvent(event:any) {
        clearInterval(this.tick);
        this.startTime = Date.now();
        this.tick = setInterval(() => {
            this.snakeMove(event.keyCode, this.snake, this.drawingLayer);
        }, this.level)
    }

    snakeMove(direction:number, snake:Snake, layer:Layer) {
        if (direction == 38) {
            if (snake.y > 0) snake.y -= 30
        } else if (direction == 40) {
            if (snake.y < Utils.FIELD_SIZE) snake.y += 30
        } else if (direction == 37) {
            if (snake.x > 0) snake.x -= 30
        } else if (direction == 39) {
            if (snake.x < Utils.FIELD_SIZE) snake.x += 30
        }
        snake.rect.y(snake.y);
        snake.rect.x(snake.x);
        layer.batchDraw();
    }

}
