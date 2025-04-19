import { prisma } from '@/lib/prisma';
import { OrgRepository } from '@/repository/org-repository';
import { Prisma } from '@prisma/client';


class PrismaOrgRepository implements OrgRepository{

  async findByOrgId(id: string){
    const org = await prisma.org.findUnique({
      where:{
        id,
      },
    });

    return org;
  }
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }


  async findByOrgEmail(email: string) {
    const org = await prisma.org.findUnique({
      where:{
        email,
      },
    });

    return org;
  }

}

export { PrismaOrgRepository };
