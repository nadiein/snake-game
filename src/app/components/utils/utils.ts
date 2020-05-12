export class Utils {
    static FIELD_SIZE = 600;
    static GRID_SIZE = 30;

    static generateRandomNumber(min, max):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomPositionCoords(value:number):Coords {
        let coords:Coords = new Coords();
        coords.x = this.generateRandomNumber(0, value) * Utils.GRID_SIZE;
        coords.y = this.generateRandomNumber(0, value) * Utils.GRID_SIZE;
        return coords;
    }

    static throttle(f:Function, ms:number) {
        let savedArgs, savedThis, tick;
        return function wrapper(...args) {
            savedArgs = args;
            savedThis = this;
            f.apply(savedThis, savedArgs);
            clearInterval(tick);
            tick = setInterval(async() => {
                await wrapper;
                wrapper.apply(savedThis, savedArgs);
            }, ms);
        }
    }
}

export class Coords {
    x:number = 0;
    y:number = 0;
}

export enum DirectionType {
    UP, DOWN, LEFT, RIGHT
}