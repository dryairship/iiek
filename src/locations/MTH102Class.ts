import * as models from '../models';
import { takeNotesRegex } from "../constants";

export class MTH102Class implements models.Location {
    name: string = "MTH102 class";

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
            if(state.notebooks[notebookNumber-1].assertNumbers()) {
                let product = 1;
                let values = state.notebooks[notebookNumber-1].popAllNumbers();
                values.forEach(value => product*=value);
                state.notebooks[notebookNumber-1].pushNumber(product);
            } else {
                state.raiseNonNumericValuesError(action);
            }
        }
    }
}
