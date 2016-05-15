export class Listing{
    constructor(
        public user_id: string = null,
        public key: string = null,
        public title: string = "",
        public description: string = "",
        public price: number = 0.00
    ) { }
}