import * as models from "../models/";
import * as regexes from "../constants";

export default class Program {
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

        let match = statement.match(regexes.gotoRegex);
        if(match === null || match.length < 2) {
            this.state.raiseInvalidSyntaxError(statement);
            return;
        }
        let place = match[1];

        // Set current location according to place.
    }

    runSchedule(statement: string): void {
        let match = statement.match(regexes.scheduleRegex);
        if(match === null || match.length < 2) {
            this.state.raiseInvalidSyntaxError(statement);
            return;
        }
        let scheduleNumber = match[1];

        // Modify statements according to schedule.
    }

    run(): void {
        this.preProcess();

        while(this.state.error === null && this.statements.length > 0) {
            let currentStatement = this.statements.pop();
            if(typeof currentStatement === 'string') {
                if(regexes.gotoRegex.test(currentStatement)) {
                    this.runGoto(currentStatement);
                }else if(regexes.scheduleRegex.test(currentStatement)) {
                    this.runSchedule(currentStatement);
                }else{
                    this.state.currentLocation.performAction(this.state, currentStatement);
                }
            }
        }

        if(this.state.error !== null){
            console.log(this.state.error);
        }else{
            this.state.output.reverse();
            let out = this.state.output.join("\n");
            console.log(out);
        }
    }
}
