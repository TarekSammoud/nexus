export class SystemRequirements {
    id: number;
    os: string;
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;

    constructor(id: number, os: string, cpu: string, gpu: string, ram: string, storage: string) {
        this.id = id;
        this.os = os;
        this.cpu = cpu;
        this.gpu = gpu;
        this.ram = ram;
        this.storage = storage;
    }
}
