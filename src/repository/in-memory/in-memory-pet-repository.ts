import { Prisma, Pet} from '@prisma/client';
import { randomUUID } from 'crypto';
import { PetRepository } from '../pet-repository';

class InMemoryPetRepository implements PetRepository{

  public items: Pet[] = [];


  async create(data: Prisma.PetCreateInput){
    const pet = {
      id:data.id ?? randomUUID(),
      name: data.name,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      description: data.description,
      city: data.city,
      status: data.status,
      species: data.species,
      orgId: data.org.connect?.id ?? randomUUID(),
      includes_at: new Date(),
    };

    this.items.push(pet);

    return pet;

  }


  async find(city: string, filters?: Partial<Prisma.PetWhereInput>): Promise<Pet[]> {
    const pets = this.items.filter((item) => {
      return item.city === city && Object.entries(filters || {}).every(([key, value]) => {
        return item[key as keyof Pet] === value;
      });
    });

    return pets;
  }


  async update(data: Prisma.PetUpdateInput) {
    const pet = this.items.find((item) => item.id === data.id);

    if (!pet) {
      throw new Error('Pet not found');
    }

    Object.assign(pet, data);
    const index = this.items.findIndex((item) => item.id === data.id);
    this.items[index] = pet;

    return pet;
  }


  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }


  async list(city: string): Promise<Pet[]> {
    const pets = this.items.filter((item) => item.city === city);

    return pets;
  }

}


export { InMemoryPetRepository };
