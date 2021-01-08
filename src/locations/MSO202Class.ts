import * as models from '../models';
import { takeNotesRegex } from "../constants";

export const MSO202Class: models.Location = class MSO202Class {
    static Name: string = "MSO202 class";

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
            if(state.notebooks[notebookNumber-1].values.length != 2) {
                state.raiseValuesCountError(action, 2, state.notebooks[notebookNumber-1].values.length);
                return;
            }
            if(state.notebooks[notebookNumber-1].assertNumbers()) {
                let values = state.notebooks[notebookNumber-1].popAllNumbers();
                if(values[1] === 0) {
                    state.raiseCustomError(action, `Trying to divide by 0`);
                    return;
                }
                state.notebooks[notebookNumber-1].pushNumber(values[0]/values[1]);
            } else {
                state.raiseNonNumericValuesError(action);
            }
        }
    }
}
