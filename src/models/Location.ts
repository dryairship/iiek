import { ProgramState } from './ProgramState';

export interface Location {
    Name: string;
    performAction(state: ProgramState, action: string): void;
}
