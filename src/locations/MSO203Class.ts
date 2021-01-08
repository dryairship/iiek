import * as models from '../models';
import { takeNotesRegex } from "../constants";

export const MSO203Class: models.Location = class MSO203Class {
    static Name: string = "MSO203 class";

    static performAction(state: models.ProgramState, action: string): void {
        let match = action.match(takeNotesRegex);
        if(match === null || match.length < 2) {
            state.raiseUnknownActionError(this, action);
            return;
        }

        if(state.subtractFun(action)) {
            let notebookNumber = Number(match[1]);
            if(Number.isNaN(notebookNumber) || state.notebooks.length < notebookNumber || notebookNumber < 1){
                state.raiseNotebookError(match[1]);
                return;
            }
            if(state.notebooks[notebookNumber-1].values.length === 0) {
                state.raiseEmptyNotebookError(action);
                return;
            }
            if(state.notebooks[notebookNumber-1].assertNumbers()) {
                let values = state.notebooks[notebookNumber-1].popAllNumbers();
                let answer = 2*values[0];
                values.forEach(value => answer-=value);
                state.notebooks[notebookNumber-1].pushNumber(answer);
            } else {
                state.raiseNonNumericValuesError(action);
            }
        }
    }
}
