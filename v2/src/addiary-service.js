import SimboService from './simbo-service';
import SimboServiceVirtual from './virtual-service';

export default class AdDiaryService extends SimboServiceVirtual {
    constructor() {
        super('addiary');
    }

    list() {
        return this.exec('list', {});
    }

    add() {
        return this.exec('add', {});
    }

    edit() {
        return this.exec('edit', {});
    }

    remove() {
        return this.exec('remove', {});
    }

    isEditRights() {
        return true;
    }
}