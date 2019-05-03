import { Utility } from '../utilities/Utility';

export class Biodata {
    private utility: Utility;
    constructor(
    public user_id: number,
    public firstname: string,
    public lastname: string,
    public dob: Date,
    public gender: string,
    public introduced_by: string
    ) {
        this.utility = new Utility();
    }

    isSetup(): boolean {
        return this.utility.isset(this.user_id) && this.utility.isset(this.firstname) && this.utility.isset(this.lastname);
    }
}