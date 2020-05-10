export class GridCreator {

}

export class Grid {
    constructor (
        private x:number,
        private y:number) { }
}

export enum EventType {
    MOUSEDOWN, KEYDOWN
}

export class EventVo {
    event:any;
    type:EventType;
}