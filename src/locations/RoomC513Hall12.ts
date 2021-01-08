import * as models from '../models';
import { introduceRegex } from "../constants";

export class RoomC513Hall12 implements models.Location {
    name: string = "Room C513, Hall 12";

    performAction(state: models.ProgramState, action: string): void {
        if(introduceRegex.test(action)) {
            state.output.push("Hello! This program was built by dryairship.");
        }else{
            state.raiseUnknownActionError(this, action);
        }
    }
}
