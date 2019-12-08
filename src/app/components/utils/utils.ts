export class Utils {

    static generateRandomNumber(min, max):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomPositionCoords(max:number):any {
        let coords:Coords = new Coords();
        coords.x = this.generateRandomNumber(0, max);
        coords.y = this.generateRandomNumber(0, max);
        return coords;
    }
}

export class Coords {
    x:number = 0;
    y:number = 0;
}