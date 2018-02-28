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

export class Ad {
   id: number;
   date: Date;
   morning1: number;
   morning2: number;
   morningPulse: number;
   evening1: number;
   evening2: number;
   eveningPulse: number;
   description: string;
   meds: string;

   constructor(morning1, morning2, morningPulse, evening1, evening2, eveningPulse, description, meds) {
      this.morning1 = morning1;
      this.morning2 = morning2;
      this.morningPulse = morningPulse;
      this.evening1 = evening1;
      this.evening2 = evening2;
      this.eveningPulse = eveningPulse;
      this.description = description;
      this.meds = meds;
   }

}
