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

    trimTop(): void {
        while(this.statements.length > 0) {
            let popped = this.statements.pop();
            if(popped === undefined) break;
            if(popped.trim().length > 0) {
                this.statements.push(popped);
                break;
            }
        }
    }

    preProcess(): void {
        while(this.statements.length > 0){
            this.trimTop();
            let popped = this.statements.pop();
            if(popped === undefined) break;
            let match = popped.match(regexes.defineScheduleRegex);
            if(match === null){
                this.statements.push(popped);
                break;
            }
            if(match.length < 2 || Number.isNaN(Number(match[1]))) {
                this.state.raiseInvalidSyntaxError(popped);
                break;
            }
            let scheduleNumber = Number(match[1]);
            let scheduleStatements: string[] = [];
            while(this.statements.length > 0) {
                popped = this.statements.pop();
                if(popped === undefined) break;
                if(regexes.endDefinitionRegex.test(popped))
                    break;
                scheduleStatements.push(popped);
            }
            scheduleStatements.reverse();
            this.schedules.set(scheduleNumber, scheduleStatements);
        }
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
        } else if(place === "AE401 class") {
            this.state.currentLocation = new locations.AE401Class();
        } else {
            this.state.raiseUnknownLocationError(place);
        }
    }

    runSchedule(statement: string): void {
        let match = statement.match(regexes.followScheduleRegex);
        if(match === null || match.length < 2) {
            this.state.raiseInvalidSyntaxError(statement);
            return;
        }
        let scheduleNumber = Number(match[1]);
        if(this.schedules.has(scheduleNumber)) {
            let scheduleStatements = this.schedules.get(scheduleNumber);
            if(scheduleStatements === undefined) return;
            this.statements = this.statements.concat(scheduleStatements);
        } else {
            this.state.raiseCustomError(statement, `Schedule ${match[1]} not found.`);
        }
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
                }else if(regexes.followScheduleRegex.test(currentStatement)) {
                    this.runSchedule(currentStatement);
                }else{
                    this.state.currentLocation.performAction(this.state, currentStatement);
                }
            }
        }

        if(this.state.error !== null){
            console.log(this.state.error);
        }else{
            let out = this.state.output.join("\n");
            console.log(out);
        }
    }
}
