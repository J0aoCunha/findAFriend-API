import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrgRepository } from '@/repository/in-memory/in-memory-org-repository';
import { InMemoryPetRepository } from '@/repository/in-memory/in-memory-pet-repository';
import { CreatePetUseCase } from '../create';
import { OrgNotExists } from '@/use-cases/org/error/org-not-exists';

let petRepository: InMemoryPetRepository;
let orgRepository: InMemoryOrgRepository;
let sut: CreatePetUseCase;

describe('Create pets use case', ()=>{

  beforeEach(()=>{
    petRepository = new InMemoryPetRepository();
    orgRepository = new InMemoryOrgRepository();
    sut =  new CreatePetUseCase(petRepository, orgRepository);
  });


  it('should be able to create a pet', async()=>{
    await orgRepository.create({
      id: 'orgId',
      name: 'OrgAdots',
      email: 'org@gmail.com.brs',
      password: '1234567',
      city: 'Vitoria',
      address: 'Vitoria, ES',
      state: 'Espirito Santo',
      whatsApp_phone: '27992276229',
    });

    const { pet }  = await sut.execute({
      name: 'rick',
      age: 2,
      size: 'LARGE',
      energy_level:'LOW',
      description: '',
      city: 'Vitoria',
      status: 'AVAILABLE',
      species: 'vira-lata',
      orgId: 'orgId',
    });


    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual('rick');

  });

  it('should not be able create a pet in not exists org', async()=>{
    await expect(async()=> sut.execute({
      name: 'rick',
      age: 2,
      size: 'LARGE',
      energy_level:'LOW',
      description: '',
      city: 'Vitoria',
      status: 'AVAILABLE',
      species: 'vira-lata',
      orgId: 'orgId-1',
    }),
    ).rejects.toBeInstanceOf(OrgNotExists);
  });

  it('should be able create any pet in one org', async()=>{

    await orgRepository.create({
      id: 'orgId',
      name: 'OrgAdots',
      email: 'org@gmail.com.brs',
      password: '1234567',
      city: 'Vitoria',
      address: 'Vitoria, ES',
      state: 'Espirito Santo',
      whatsApp_phone: '27992276229',
    });

    await sut.execute({
      name: 'rick',
      age: 2,
      size: 'LARGE',
      energy_level:'LOW',
      description: '',
      city: 'Vitoria',
      status: 'AVAILABLE',
      species: 'vira-lata',
      orgId: 'orgId',
    });

    await sut.execute({
      name: 'babi',
      age: 2,
      size: 'LARGE',
      energy_level:'LOW',
      description: '',
      city: 'Vitoria',
      status: 'AVAILABLE',
      species: 'vira-lata',
      orgId: 'orgId',
    });

    expect(petRepository.items).toHaveLength(2);
    expect(petRepository.items[0].name).toEqual('rick');
  });


});
