export class Category {
    id!: number;
    name!: string;
    description?: string;
  
    constructor(data?: Partial<Category>) {
      Object.assign(this, data);
    }
  }
  