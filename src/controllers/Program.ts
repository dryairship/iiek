import * as models from "../models/";
import * as regexes from "../constants";
import * as locations from "../locations";

export default class Program {
    statements: string[];
    state: models.ProgramState;
    schedules: Map<number, string[]>;

    constructor(program: string, input: string) {
        this.statements = program.split(/\r?\n/).reverse();
        this.schedules = new Map();
        let inputArray = input.split(/\r?\n/).reverse();
        this.state = new models.ProgramState(inputArray);
    }

    preProcess(): void {
        // Extract and set Schedules here
    }

    runGoto(statement: string): void {
        if(!this.state.subtractFood(statement))
            return;
        let match = statement.match(regexes.gotoRegex);
        if(match === null || match.length < 2) {
            this.state.raiseInvalidSyntaxError(statement);
            return;
        }
        let place = match[1].trim();

        if(place === "Room C513, Hall 12") {
            this.state.currentLocation = new locations.RoomC513Hall12();
        } else if(place === "New ShopC") {
            this.state.currentLocation = new locations.NewShopC();
        } else if(place === "Old ShopC") {
            this.state.currentLocation = new locations.OldShopC();
        } else if(place === "ENG112 class") {
            this.state.currentLocation = new locations.ENG112Class();
        } else if(place === "COM200 class") {
            this.state.currentLocation = new locations.COM200Class();
        } else {
            this.state.raiseUnknownLocationError(place);
        }
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
                if(currentStatement.trim().length === 0)
                    continue;

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
