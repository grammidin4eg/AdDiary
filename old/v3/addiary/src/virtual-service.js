export default class SimboServiceVirtual {
    constructor(object) {
        this.object = object;
        this.lastResult = null;
        this.data  = [
            {id: 0, date: '17.04.2019', period1: {sys: '121', dia: '81', pulse: '91'}, period2: {sys: '122', dia: '82', pulse: '92'}, comment: 'хорошее', med: 'ВАЛЗ, Диувер, Глицин, Леркамен' },
            {id: 1, date: '18.04.2019', period1: {sys: '140', dia: '90', pulse: '110'}, period2: {sys: '150', dia: '90', pulse: '120'}, comment: 'плохое', med: 'Диувер, Глицин, Леркамен' },
            {id: 2, date: '19.04.2019', period1: {sys: '160', dia: '95', pulse: '120'}, period2: {sys: '200', dia: '100', pulse: '140'}, comment: 'плохое', med: 'Леркамен' }
        ];
        this.lastId = 2;
    }

    exec(_method, _params, _navigation) {
        let data;
        switch (_method) {
            case 'list':
                data = this.data;
                break;            
            case 'register':
                data = {id: 777, email: 'samplemail@mail.com', age: 34};
                break;
            case 'login':
                data = {id: 777, email: 'samplemail@mail.com', age: 34};
                break;
            case 'error':
                data="error";
                break;
            default:
                data = 'OK';
                break;
        }
        return new Promise((resolve, reject) => {
            if (data === 'error') {
                reject(new Error('test error'));
            } else {
                resolve(data);
            }
        });
    }
}