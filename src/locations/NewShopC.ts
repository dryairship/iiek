import * as models from '../models';
import { buyNotebooksRegex, NOTEBOOK_COST } from "../constants";

export const NewShopC: models.Location = class NewShopC {
    static Name: string = "New ShopC";

    static performAction(state: models.ProgramState, action: string): void {
        let match = action.match(buyNotebooksRegex);
        if(match === null || match.length < 2) {
            state.raiseUnknownActionError(this, action);
            return;
        }

        let count = Number(match[1]);
        if(Number.isNaN(count)){
            state.raiseCustomError(action, `Invalid count of notebooks ${match[1]}`);
            return;
        }

        let requiredMoney = count*NOTEBOOK_COST;
        if(state.subtractMoney(action, requiredMoney)) {
            for(let i=0; i<count; i++)
                state.notebooks.push(new models.Notebook());
        }
    }
}
