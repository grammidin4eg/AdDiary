import SimboService from './simbo-service';
import SimboServiceVirtual from './virtual-service';

export default class UserService extends SimboServiceVirtual {
    constructor() {
        super('user');
    }

    register(login, password, age) {
        return this.exec('register', {login, password, age});
    }

    login(login, password) {
        return this.exec('login', {login, password});
    }

    saveLocal(userObj) {
        localStorage.setItem('adDiaryUserObj', JSON.stringify(userObj))
    }

    error() {
        return this.exec('error', {});
    }
    
    get() {
       return null; 
    }
}