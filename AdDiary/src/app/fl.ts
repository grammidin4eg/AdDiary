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

   constructor(value: string) {
      if(!value) {
         return;
      }
      let arr = value.split(';');
      if(!arr || arr.length < 2) {
         return;
      }
      this.up = parseInt(arr[0], 10);
      this.down = parseInt(arr[1], 10);
      this.pulse = parseInt(arr[2], 10);
      if( this.up && !isNaN(this.up) && this.down && !isNaN(this.down) && this.pulse && !isNaN(this.pulse)   ) {
         this.correct = true;
      }
   }
}

export class Ad {
   id: number;
   date: Date;
   value1: AdValue;
   value2: AdValue;
   value3: AdValue;
   value4: AdValue;
   description: string;
   meds: string;

   constructor(value1: string, value2: string, value3: string, value4: string, description: string, meds: string) {
      this.value1 = new AdValue(value1);
      this.value2 = new AdValue(value2);
      this.value3 = new AdValue(value3);
      this.value4 = new AdValue(value4);
      this.description = description;
      this.meds = meds;
   }

}
