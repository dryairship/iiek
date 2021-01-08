import * as models from '../models';
import { introduceRegex } from "../constants";

export const RoomC513Hall12: models.Location = class RoomC513Hall12 {
    static Name: string = "Room C513, Hall 12";

    static performAction(state: models.ProgramState, action: string): void {
        if(introduceRegex.test(action)) {
            state.output.push("Hello! This program was built by dryairship.");
        }else{
            state.raiseUnknownActionError(this, action);
        }
    }
}
