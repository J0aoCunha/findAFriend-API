import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryOrgRepository } from '@/repository/in-memory/in-memory-org-repository';
import { CreateOrgUseCase } from '../create';
import { compare } from 'bcryptjs';
import { OrgAlreadyExists } from '../error/org-already-exists';

let repository: InMemoryOrgRepository;
let sut: CreateOrgUseCase;

describe('Create org use case', ()=>{

  beforeEach(()=>{
    repository = new InMemoryOrgRepository();
    sut =  new CreateOrgUseCase(repository);
  });


  it('should be able to create a org', async()=>{

    const { org }  = await sut.execute({
      name: 'OrgAdots',
      email: 'OrgAdots@gmail.com',
      password: '1234567',
      city: 'Vitoria',
      address: 'Vitoria, ES',
      state: 'Espirito Santo',
      whatsApp_phone: '27992276229',
    });

    expect(org.id).toEqual(expect.any(String));

  });

  it('should be able to correct password hash', async()=>{

    const { org }  = await sut.execute({
      name: 'OrgAdots',
      email: 'OrgAdots@gmail.com',
      password: '1234567',
      city: 'Vitoria',
      address: 'Vitoria, ES',
      state: 'Espirito Santo',
      whatsApp_phone: '27992276229',
    });

    const isPasswordCorrectlyHashed = await compare(
      '1234567',
      org.password,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);

  });


  it('should not be able to register with same email', async()=>{
    const email = 'johndoe@gmail.com';

    await sut.execute({
      name: 'OrgAdots',
      email,
      password: '1234567',
      city: 'Vitoria',
      address: 'Vitoria, ES',
      state: 'Espirito Santo',
      whatsApp_phone: '27992276229',
    });

    await expect(()=>
      sut.execute({
        name: 'OrgAdots',
        email,
        password: '1234567',
        city: 'Vitoria',
        address: 'Vitoria, ES',
        state: 'Espirito Santo',
        whatsApp_phone: '27992276229',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExists);

  });

});
