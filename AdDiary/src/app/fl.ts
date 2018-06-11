export class User {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

export class AdValue {
    up: number;
    down: number;
    pulse: number;
    correct: boolean;
    edit: boolean = false;
    value: string = "";

    constructor(value: string) {
        if (!value) {
            return;
        }
        this.value = value;
        this.update();
    }

    toString(): string {
        if (!this.correct) {
            return '';
        }
        return `${this.up}/${this.down}/${this.pulse}`;
    }

    setEdit(value: boolean) {
        if(!value && this.edit) {
            this.update();
        }
        this.edit = value;
    }

    isEdit(): boolean {
        return this.edit;
    }

    update() {
        console.log('update', this.value);
        this.value = this.value.replace(/;/g, '/');
        const arr = this.value.split('/');
        if (!arr || arr.length < 2) {
            return;
        }        
        console.log('update2', arr);
        this.up = parseInt(arr[0], 10);
        this.down = parseInt(arr[1], 10);
        this.pulse = parseInt(arr[2], 10);
        if (this.up && !isNaN(this.up) && this.down && !isNaN(this.down) && this.pulse && !isNaN(this.pulse)) {
            this.correct = true;
        }
        console.log('update3', this);
    }
}

export class Ad {
    id: number;
    date: Date;
    day: number;
    value1: AdValue;
    value2: AdValue;
    value3: AdValue;
    value4: AdValue;
    description: string;
    meds: string;
    curDate: boolean;

    constructor(day: number, value1: string, value2: string, value3: string, value4: string, description: string, meds: string) {
        this.value1 = new AdValue(value1);
        this.value2 = new AdValue(value2);
        this.value3 = new AdValue(value3);
        this.value4 = new AdValue(value4);
        this.description = description;
        this.meds = meds;
        this.day = day;
    }

    setCurDate(value: boolean) {
        this.curDate = value;
    }

}
