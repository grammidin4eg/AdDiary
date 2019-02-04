export class SimboResult {
  RESULT: string;
  ERROR: string;
  DATA: string;
  constructor(result) {
     this.RESULT = result.RESULT;
     this.ERROR = result.ERROR;
     this.DATA = result.DATA;
  }

  isOK(): boolean {
     return (this.RESULT === 'OK');
  }

  getError(): string {
     return this.ERROR;
  }

  getData() {
     return this.DATA;
  }

  getList() {
   return this.DATA['LIST'];
  }

  getInsertId() {
     return this.DATA ? this.DATA['INSERT_ID'] : null;
  }

  errorEqu(errorId: string): boolean {
     return (this.DATA === errorId);
  }
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
