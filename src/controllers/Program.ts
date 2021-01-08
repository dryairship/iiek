import * as models from "../models/";

const gotoRegex = new RegExp('^Go to (?:the|a)?\\s?([a-zA-Z0-9 ]+)$');
const scheduleRegex = new RegExp('^Follow Maggu Schedule ([0-9]+)$');

export class Program {
    statements: string[];
    state: models.ProgramState;
    input: string[];
    schedules: Map<number, string[]>;

    constructor(program: string, input: string) {
        this.statements = program.split(/\r?\n/).reverse();
        this.input = input.split(/\r?\n/);
        this.schedules = new Map();
        this.state = new models.ProgramState();
    }

    preProcess(): void {
        // Extract and set Schedules here
    }

    runGoto(statement: string): void {
        if(this.state.foodLevel > 0)
            this.state.foodLevel -= 1;
        else
            this.state.raiseFoodError(statement);

        let match = statement.match(gotoRegex);
        let place = match[1];

        // Set current location according to place.
    }

    runSchedule(statement: string): void {
        let match = statement.match(scheduleRegex);
        let scheduleNumber = match[1];

        // Modify statements according to schedule.
    }

    run(): void {
        this.preProcess();
        
        while(this.state.error === null && this.statements.length > 0) {
            let currentStatement = this.statements.pop();
            if(gotoRegex.test(currentStatement)) {
                this.runGoto(currentStatement);
            }else if(scheduleRegex.test(currentStatement)) {
                this.runSchedule(currentStatement);
            }else{
                this.state.currentLocation.performAction(currentStatement);
            }
        }
    }
}
