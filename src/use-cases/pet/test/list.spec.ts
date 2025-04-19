import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPetRepository } from '@/repository/in-memory/in-memory-pet-repository';
import { ListPetsUseCase } from '../list';
import { CityIsMandatory } from '../error/city-is-mandatory';

let petRepository: InMemoryPetRepository;
let sut: ListPetsUseCase;

describe('List pets use case', ()=>{

  beforeEach(()=>{
    petRepository = new InMemoryPetRepository();
    sut =  new ListPetsUseCase(petRepository);
  });


  it('should be able to list pets', async()=>{

    for(let i = 0; i< 10; i++){
      await petRepository.create({
        name: `rick-${i}`,
        age: 2,
        size: 'LARGE',
        energy_level:'LOW',
        description: '',
        city: 'Vitoria',
        status: 'AVAILABLE',
        species: 'vira-lata',
        org: {
          connect:{
            id: 'orgId',
          },
        },
      });
    }

    const { pets }  = await sut.execute({
      city: 'Vitoria',
    });

    expect(pets.length).toEqual(10);
    expect(pets[1].name).toEqual('rick-1');
  });

  it('should not be able  list pets non inform city', async()=>{
    for(let i = 0; i< 10; i++){
      await petRepository.create({
        name: `rick-${i}`,
        age: 2,
        size: 'LARGE',
        energy_level:'LOW',
        description: '',
        city: 'Vitoria',
        status: 'AVAILABLE',
        species: 'vira-lata',
        org: {
          connect:{
            id: 'orgId',
          },
        },
      });
    }

    await expect(async()=>
      await sut.execute({
        city: '',
      }),
    ).rejects.toBeInstanceOf(CityIsMandatory);
  });

});
