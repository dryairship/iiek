import { Notebook } from "./Notebook";
import { Location } from "./Location";
import RoomC513Hall12 from "./locations/RoomC513Hall12";

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
        this.currentLocation = new RoomC513Hall12();
    }

    raiseFoodError(statement: string): void {
        this.error = "Not enough food to execute command: " + statement;
    }

    raiseUnknownActionError(location: Location, statement: string): void {
        this.error = "Cannot perform this action at "+ location.name+": "+statement;
    }

    raiseInvalidSyntaxError(statement: string): void {
        this.error = "Invalid Syntax: "+statement;
    }
}
