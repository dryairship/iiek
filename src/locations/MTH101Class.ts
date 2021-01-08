import * as models from '../models';
import { takeNotesRegex } from "../constants";

export const MTH101Class: models.Location = class MTH101Class {
    static Name: string = "MTH101 class";

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
            if(state.notebooks[notebookNumber-1].assertNumbers()) {
                let sum = 0;
                let values = state.notebooks[notebookNumber-1].popAllNumbers();
                values.forEach(value => sum+=value);
                state.notebooks[notebookNumber-1].pushNumber(sum);
            } else {
                state.raiseNonNumericValuesError(action);
            }
        }
    }
}
