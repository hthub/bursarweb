import { Biodata } from './Biodata';
import { Utility } from '../utilities/Utility';

export class User {
    utility: Utility;
    constructor(
        public id: number,
        public email: string,
        public biodata?: Biodata,
    ) {
        this.utility = new Utility();
    }

    isUser(): boolean {
        return this.utility.isset(this.id);
    }
}