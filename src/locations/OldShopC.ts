import * as models from '../models';
import { copyNotesRegex, COPYING_COST } from "../constants";

export const OldShopC: models.Location = class OldShopC {
    static Name: string = "Old ShopC";

    static performAction(state: models.ProgramState, action: string): void {
        let match = action.match(copyNotesRegex);
        if(match === null || match.length < 3) {
            state.raiseInvalidSyntaxError(action);
            return;
        }
        
        if(state.subtractMoney(action, COPYING_COST)) {
            let notebookFrom = Number(match[1]);
            let notebookTo = Number(match[2]);
            if(Number.isNaN(notebookFrom) || state.notebooks.length < notebookFrom || notebookFrom < 1) {
                state.raiseNotebookError(match[1]);
                return;
            }
            if(Number.isNaN(notebookTo) || state.notebooks.length < notebookTo || notebookTo < 1) {
                state.raiseNotebookError(match[2]);
                return;
            }

            let from = state.notebooks[notebookFrom-1];
            let to = state.notebooks[notebookTo-1];
            from.values.forEach(value => to.push(new models.Value(value.type, value.data)));
        }
    }
}
