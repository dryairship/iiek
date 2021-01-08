import * as models from '../models';
import { takeNotesRegex } from "../constants";

export class AE401Class implements models.Location {
    name: string = "AE401 class";

    performAction(state: models.ProgramState, action: string): void {
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

            let line = state.input.pop();
            if(state.input.length <= 0 || !line) {
                state.raiseCustomError(action, `Input is empty`);
                return;
            }

            let num = Number(line);
            if(Number.isNaN(num)) {
                state.raiseCustomError(action, `Input is not a number: ${line}`);
                return;
            }
            state.notebooks[notebookNumber-1].pushNumber(num);
        }
    }
}
