import * as models from '../models';
import { takeNotesRegex } from "../constants";

export const PHY103Class: models.Location = class PHY103Class {
    static Name: string = "PHY103 class";

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
            state.notebooks[notebookNumber-1].clear();
        }
    }
}
