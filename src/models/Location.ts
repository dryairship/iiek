import { ProgramState } from './ProgramState';

export interface Location {
    performAction(state: ProgramState, action: string): void;
}
