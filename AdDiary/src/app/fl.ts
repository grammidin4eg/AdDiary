class User {
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

class Ad {
   id: number;
   date: Date;
   morning: number;
   evening: number;
   pulse: number;
   description: string;
   meds: string;

   constructor(morning, evening, pulse, description, meds) {
      this.morning = morning;
      this.evening = evening;
      this.pulse = pulse;
      this.description = description;
      this.meds = meds;
   }

}
