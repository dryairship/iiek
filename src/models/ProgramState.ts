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
        this.currentLocation = RoomC513Hall12;
    }

    subtractFood(statement: string): boolean {
        if(this.foodLevel > 0) {
            this.foodLevel -= 1;
            return true;
        }
        this.raiseFoodError(statement);
        return false;
    }

    subtractFun(statement: string): boolean {
        if(this.funLevel > 0) {
            this.funLevel -= 1;
            return true;
        }
        this.raiseFunError(statement);
        return false;
    }

    subtractMoney(statement: string, amount: number): boolean {
        if(this.money > amount) {
            this.money -= amount;
            return true;
        }
        this.raiseMoneyError(statement, amount);
        return false;
    }

    raiseFoodError(statement: string): void {
        this.error = `Not enough food to execute command: ${statement}`;
    }

    raiseFunError(statement: string): void {
        this.error = `Not enough fun value to execute command: ${statement}`;
    }

    raiseMoneyError(statement: string, required: number): void {
        this.error = `Not enough money to execute command: ${statement}.\nRequired: ${required}. Have: ${this.money}`;
    }

    raiseUnknownActionError(location: Location, statement: string): void {
        this.error = `Cannot perform this action at ${location.Name}: ${statement}`;
    }

    raiseInvalidSyntaxError(statement: string): void {
        this.error = `Invalid Syntax: ${statement}`;
    }

    raiseCustomError(statement: string, error: string): void {
        this.error = `Error raised in statement: ${statement}\n${error}`;
    }

    raiseUnknownLocationError(location: string): void {
        this.error = `Unknown location: ${location}`;
    }

    raiseNotebookError(notebook: string): void {
        this.error = `Invalid notebook number ${notebook}`;
    }

    raiseNonNumericValuesError(statement: string): void {
        this.error = `Error raised in statement: ${statement}\nNotebook contains non-numeric values.`;
    }

    raiseNonStringValuesError(statement: string): void {
        this.error = `Error raised in statement: ${statement}\nNotebook contains non-string values.`;
    }

    raiseValuesCountError(statement: string, expectedCount: number, hasCount: number): void {
        this.error = `Error raised in statement: ${statement}\nNotebook contains different number of values than expected. Expected: ${expectedCount}. Has: ${hasCount}`;
    }

    raiseEmptyNotebookError(statement: string): void {
        this.error = `Error raise in statement: ${statement}\nNotebook is empty.`
    }
}
