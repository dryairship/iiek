import * as models from '../models';
import { takeNotesRegex } from "../constants";

export const CHM101Lab: models.Location = class CHM101Lab {
    static Name: string = "CHM101 lab";

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
                let str = notebook.popAllStrings()[0];
                if(str.length != 1) {
                    state.raiseCustomError(action, `String "${str}" does not have length 1.`);
                    return;
                }
                notebook.pushNumber(str.charCodeAt(0));
            } else if (notebook.assertNumbers()){
                let num = notebook.popAllNumbers()[0];
                if(num < 0 || num > 255) {
                    state.raiseCustomError(action, `Number ${num} is not a UTF-8 character code.`);
                    return;
                }
                notebook.pushString(String.fromCharCode(num));
            }
        }
    }
}
