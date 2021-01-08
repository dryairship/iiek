import { Notebook } from "./Notebook";
import { Location } from "./Location";
import { RoomC513Hall12 } from "../locations/RoomC513Hall12";
import * as constants from "../constants";

export class ProgramState {
    currentLocation: Location;
    funLevel: number;
    foodLevel: number;
    money: number;
    notebooks: Array<Notebook>;
    error: string | null;
    output: string[];
    input: string[];

    constructor(input: string[]) {
        this.funLevel = constants.MAX_FUN_LEVEL;
        this.foodLevel = constants.MAX_FOOD_LEVEL;
        this.money = constants.INITIAL_MONEY;
        this.notebooks = [];
        this.error = null;
        this.output = [];
        this.input = input;
        this.currentLocation = new RoomC513Hall12();
    }

    raiseFoodError(statement: string): void {
        this.error = `Not enough food to execute command: ${statement}`;
    }

    raiseUnknownActionError(location: Location, statement: string): void {
        this.error = `Cannot perform this action at ${location.name}: ${statement}`;
    }

    raiseInvalidSyntaxError(statement: string): void {
        this.error = `Invalid Syntax: ${statement}`;
    }

    raiseCustomError(statement: string, error: string): void {
        this.error = `Error raised in statement: ${statement}\n${error}`;
    }

    raiseUnknownLocationError(location: string) {
        this.error = `Unknown location: ${location}`;
    }

    raiseNotebookError(notebook: string) {
        this.error = `Invalid notebook number ${notebook}`;
    }
}
