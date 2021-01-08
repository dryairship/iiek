import * as models from '../models';
import { buyNotebooksRegex, NOTEBOOK_COST } from "../constants";

export class NewShopC implements models.Location {
    name: string = "New ShopC";

    performAction(state: models.ProgramState, action: string): void {
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
        if(state.money < requiredMoney){
            state.raiseCustomError(action, `Not enough money to buy ${match[1]} notebooks. Required: ${requiredMoney}, Have: ${state.money}`);
            return;
        }

        state.money -= requiredMoney;
        for(let i=0; i<count; i++)
            state.notebooks.push(new models.Notebook());
    }
}
