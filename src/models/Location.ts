import { ProgramState } from './ProgramState';

export interface Location {
    name: string;
    performAction(state: ProgramState, action: string): void;
}
