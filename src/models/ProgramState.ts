import { Notebook } from './Notebook';

export class ProgramState {
    currentLocation: Location;
    funLevel: number;
    foodLevel: number;
    money: number;
    notebooks: Array<Notebook>;
    error: string | null;
    output: string[];

    constructor() {
        this.funLevel = 100;
        this.foodLevel = 100;
        this.money = 1000;
        this.notebooks = [];
        this.error = null;
        this.output = [];
    }

    raiseFoodError(statement: string): void {
        this.error = "Not enough food to execute command: " + statement;
    }
}
