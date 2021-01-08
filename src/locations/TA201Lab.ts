import * as models from '../models';
import { takeNotesRegex } from "../constants";

export const TA201Lab: models.Location = class TA201Lab {
    static Name: string = "TA201 lab";

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
            let answer = "";
            notebook.values.forEach(value => answer = answer.concat(String(value.data)));
            notebook.clear();
            notebook.pushString(answer);
        }
    }
}
