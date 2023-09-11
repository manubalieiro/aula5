export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public id?: string,
        public disponibilidade: boolean = true // Adicionar a disponibilidade, que por padrão é true (disponível).
    ) {}
}
