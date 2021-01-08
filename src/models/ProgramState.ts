class ProgramState {
    currentLocation: Location;
    funLevel: number;
    foodLevel: number;
    money: number;
    notebooks: Array<Notebook>;
    
    constructor() {
        this.funLevel = 100;
        this.foodLevel = 100;
        this.money = 1000;
    }
}
