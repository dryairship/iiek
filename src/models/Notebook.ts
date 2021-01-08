export enum ValueType {
    NUMBER, STRING
}

export class Value {
    type: ValueType;
    data: number | string;

    constructor(type: ValueType, data: number | string) {
        this.type = type;
        this.data = data;
    }
}

export class Notebook {
    values: Value[];

    constructor() {
        this.values = [];
    }

    count(): number {
        return this.values.length;
    }

    clear(): void {
        this.values = [];
    }

    push(value: Value): void {
        this.values.push(value);
    }

    pushNumber(value: number): void {
        this.values.push(new Value(ValueType.NUMBER, value));
    }

    pushString(value: string): void {
        this.values.push(new Value(ValueType.STRING, value));
    }

    assertNumbers(): boolean {
        return this.values.every(
            value => value.type = ValueType.NUMBER
        );
    }

    assertStrings(): boolean {
        return this.values.every(
            value => value.type = ValueType.STRING
        );
    }

    popAllNumbers(): number[] {
        let result = this.values.map(
            value => {
                if (typeof value.data === 'number') {
                    return value.data;
                } else {
                    return 0;
                }
            }
        );
        this.values = [];
        return result;
    }

    popAllStrings(): string[] {
        let result = this.values.map(
            value => {
                if (typeof value.data === 'string') {
                    return value.data;
                } else {
                    return "";
                }
            }
        );
        this.values = [];
        return result;
    }
}
