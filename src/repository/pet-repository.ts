import { Pet, Prisma } from '@prisma/client';

interface PetRepository {
    create(data: Prisma.PetCreateInput): Promise<Pet>;
    find(city: string, filters?: Partial<Prisma.PetWhereInput>): Promise<Pet[]>;
    update(data: Prisma.PetUpdateInput): Promise<Pet>;
    findById(id: string): Promise<Pet | null>;
    list(city: string): Promise<Pet[]>;
}

export { PetRepository };
