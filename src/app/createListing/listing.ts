export class Listing{
    constructor(
        public id: number = new Date().getTime(),
        public title: string = "",
        public description: string = "",
        public price: number = 0.00
    ) { }
}