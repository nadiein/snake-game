import { Utils } from '../utils/utils';

export class GridCreator {

    public grid:Grid = new Grid();
    private strokeColor:string = '#ddd';
    private strokeWidth:number = 1;

    constructor (
        private width:number = Utils.FIELD_SIZE,
        private height:number = Utils.FIELD_SIZE,
        private step:number = Utils.GRID_SIZE
    ) {
        this.createGrid()
    }

    createGrid() {
        let linesOnAxisX = Math.ceil(this.width - this.step / this.step);
        let linesOnAxisY = Math.ceil(this.height - this.step / this.step);

        for (let i = 0; i < linesOnAxisX; i++) {
            this.grid.x.push({
                points: [Math.ceil(i * this.step), 0, Math.ceil(i * this.step), this.height],
                stroke: this.strokeColor,
                strokeWidth: this.strokeWidth,
            });
        }

        for (let j = 0; j < linesOnAxisY; j++) {
            this.grid.y.push({
                points: [0, Math.ceil(j * this.step), this.width, Math.ceil(j * this.step)],
                stroke: this.strokeColor,
                strokeWidth: this.strokeWidth,
            });
        }
    }
}

export class Grid {
    x:any[] = [];
    y:any[] = [];
}

export enum EventType {
    MOUSEDOWN, KEYDOWN
}

export class EventVo {
    event:any;
    type:EventType;
}