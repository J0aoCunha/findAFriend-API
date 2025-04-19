import { PetRepository } from '@/repository/pet-repository';
import { Pet } from '@prisma/client';
import { CityIsMandatory } from './error/city-is-mandatory';

interface ListPetUseCaseRequest {
    city: string
}

interface ListPetUseCaseResponse {
  pets: Pet[];
}

class ListPetsUseCase{
  constructor(private petRepository: PetRepository) {}

  async execute({city}:ListPetUseCaseRequest): Promise<ListPetUseCaseResponse> {

    const pets = await this.petRepository.list(city);

    if(!city) {
      throw new CityIsMandatory();
    }


    return { pets };

  }
}
export { ListPetsUseCase };
