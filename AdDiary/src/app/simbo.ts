export class SimboResult {
  RESULT: String;
  ERROR: String;
  DATA: String;
  constructor() {}
}

export class CallParams {
  OBJ: String;
  MET: String;
  ID: String;
  PARAMS: String;

  constructor(obj, met, id, params) {
    this.OBJ = obj;
    this.MET = met;
    this.ID = id;
    this.PARAMS = params;
  }
}

export const BLURL = '/adDiary.php';
