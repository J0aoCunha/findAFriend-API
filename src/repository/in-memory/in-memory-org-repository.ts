import { OrgRepository } from '@/repository/org-repository';
import { Prisma, Org } from '@prisma/client';
import { randomUUID } from 'crypto';

class InMemoryOrgRepository implements OrgRepository{

  public items: Org[] = [];

  async findByOrgId(id: string){
    const org = this.items.find((item) => item.id === id);

    if(!org){
      return null;
    }

    return org;
  }

  async findByOrgEmail(email: string){
    const org = this.items.find((item) => item.email === email);

    if(!org){
      return null;
    }

    return org;
  }

  async create(data: Prisma.OrgCreateInput){
    const org = {
      id:data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      city: data.city,
      state: data.state,
      address: data.address,
      whatsApp_phone: data.whatsApp_phone,
    };

    this.items.push(org);

    return org;
  }

}


export { InMemoryOrgRepository };
