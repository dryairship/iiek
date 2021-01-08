import * as models from '../models';
import { takeNotesRegex } from "../constants";

export class ENG112Class implements models.Location {
    name: string = "ENG112 class";

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

            let values = state.notebooks[notebookNumber-1].values;
            for(let i=0; i<values.length; i++)
                state.output.push(String(values[i].data));
            state.notebooks[notebookNumber-1].clear();
        }
    }
}
