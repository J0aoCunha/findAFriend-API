import { OrgRepository } from '@/repository/org-repository';
import { Org } from '@prisma/client';
import { hash } from 'bcryptjs';
import { OrgAlreadyExists } from './error/org-already-exists';

interface CreateOrgUseCaseRequest {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  whatsApp_phone: string;
  address: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

class CreateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    address,
    city,
    email,
    name,
    password,
    state,
    whatsApp_phone,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {

    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgRepository.findByOrgEmail(email);

    if(orgWithSameEmail){
      throw new OrgAlreadyExists();
    }

    const org = await this.orgRepository.create({
      address,
      city,
      email,
      name,
      password: password_hash,
      state,
      whatsApp_phone,
    });

    return { org };
  }
}

export { CreateOrgUseCase };
