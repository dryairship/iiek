import * as models from '../models';
import { takeNotesRegex } from "../constants";

export const TA202Lab: models.Location = class TA202Lab {
    static Name: string = "TA202 lab";

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
            let notebook = state.notebooks[notebookNumber-1];
            if(notebook.values.length != 1) {
                state.raiseValuesCountError(action, 1, notebook.values.length);
                return;
            }
            if(notebook.assertStrings()) {
                let values = notebook.popAllStrings();
                values[0].trim().split("").forEach(value => notebook.pushString(value));
            } else {
                state.raiseNonStringValuesError(action);
            }
        }
    }
}
