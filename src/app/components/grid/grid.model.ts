export class GridCreator {

    static buildGrid(cells:number):Grid[] {
        let grid:Grid[] = [];

        for (let x = 1; x < cells; x++) {
            
            for (let y = 1; y < cells; y++) {
                grid.push(new Grid(y, x));
            }
        }
        // console.log(grid)
        return grid;
    }
}

export class Grid {
    constructor (
        private x:number,
        private y:number) { }
}