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

        if(place === locations.RoomC513Hall12.Name) {
            this.state.currentLocation = locations.RoomC513Hall12;
        } else if(place === locations.NewShopC.Name) {
            this.state.currentLocation = locations.NewShopC;
        } else if(place === locations.OldShopC.Name) {
            this.state.currentLocation = locations.OldShopC;
        } else if(place === locations.ENG112Class.Name) {
            this.state.currentLocation = locations.ENG112Class;
        } else if(place === locations.COM200Class.Name) {
            this.state.currentLocation = locations.COM200Class;
        } else if(place === locations.AE401Class.Name) {
            this.state.currentLocation = locations.AE401Class;
        } else if(place === locations.MTH101Class.Name) {
            this.state.currentLocation = locations.MTH101Class;
        } else if(place === locations.MTH102Class.Name) {
            this.state.currentLocation = locations.MTH102Class;
        } else if(place === locations.MSO202Class.Name) {
            this.state.currentLocation = locations.MSO202Class;
        } else if(place === locations.MSO203Class.Name) {
            this.state.currentLocation = locations.MSO203Class;
        } else if(place === locations.PHY103Class.Name) {
            this.state.currentLocation = locations.PHY103Class;
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

    runIf(statement: string): void {
        let match = statement.match(regexes.ifRegex);
        if(match === null || match.length < 3) {
            this.state.raiseInvalidSyntaxError(statement);
            return;
        }
        let notebookNumber = Number(match[1]);
        let ifScheduleNumber = Number(match[2]);
        let elseScheduleNumber = Number(match[3]);
        if(Number.isNaN(notebookNumber) || notebookNumber > this.state.notebooks.length || notebookNumber < 1) {
            this.state.raiseNotebookError(match[1]);
            return;
        }
        if(!this.schedules.has(ifScheduleNumber)) {
            this.state.raiseCustomError(statement, `if schedule (${match[2]}) not found.`);
            return;
        }
        if(statement.includes("else") && !this.schedules.has(elseScheduleNumber)) {
            this.state.raiseCustomError(statement, `else schedule (${match[3]}) not found.`);
            return;
        }

        let notebook = this.state.notebooks[notebookNumber-1];
        let shouldFollowSchedule = false
            || (notebook.values.length > 1)
            || (notebook.values.length > 0 && notebook.values[0].type === models.ValueType.NUMBER && notebook.values[0].data !== 0)
            || (notebook.values.length > 0 && notebook.values[0].type === models.ValueType.STRING && notebook.values[0].data.toString().trim().length > 0);

        if(shouldFollowSchedule) {
            let scheduleStatements = this.schedules.get(ifScheduleNumber);
            if(scheduleStatements === undefined) return;
            this.statements = this.statements.concat(scheduleStatements);
        }else if(statement.includes("else")) {
            let scheduleStatements = this.schedules.get(elseScheduleNumber);
            if(scheduleStatements === undefined) return;
            this.statements = this.statements.concat(scheduleStatements);
        }
    }

    run(): void {
        this.preProcess();

        while(this.state.error === null && this.statements.length > 0) {
            let currentStatement = this.statements.pop();
            if(typeof currentStatement === 'string') {
                currentStatement = currentStatement.trim();
                if(currentStatement.length === 0)
                    continue;
                if(currentStatement.startsWith("//"))
                    continue;

                if(regexes.gotoRegex.test(currentStatement)) {
                    this.runGoto(currentStatement);
                }else if(regexes.followScheduleRegex.test(currentStatement)) {
                    this.runSchedule(currentStatement);
                }else if(regexes.ifRegex.test(currentStatement)) {
                    this.runIf(currentStatement);
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
