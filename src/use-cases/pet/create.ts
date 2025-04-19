import { PetRepository } from '@/repository/pet-repository';
import { Energy_level, Pet, Size, Status } from '@prisma/client';
import { OrgRepository } from '@/repository/org-repository';
import { OrgNotExists } from '../org/error/org-not-exists';


interface CreatePetUseCaseRequest {
  name: string
  age: number
  size: Size
  energy_level: Energy_level
  description: string
  city: string
  status: Status
  species: string
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

class CreatePetUseCase {
  constructor(private petRepository: PetRepository, private orgRepository:OrgRepository) {}

  async execute({
    name,
    age,
    size,
    energy_level,
    description,
    city,
    status,
    species,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {

    const OrgIdExists = await this.orgRepository.findByOrgId(orgId);

    if(!OrgIdExists){
      throw new OrgNotExists;
    }

    const pet = await this.petRepository.create({
      name,
      age,
      size,
      energy_level,
      description,
      city,
      status,
      species,
      org:{
        connect:{
          id: orgId,
        },
      },
    });

    return { pet };
  }
}

export { CreatePetUseCase };
