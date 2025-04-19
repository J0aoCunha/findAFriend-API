import { Org, Prisma } from '@prisma/client';

interface OrgRepository {
    create(data: Prisma.OrgCreateInput): Promise<Org>;
    findByOrgEmail(email: string): Promise<Org| null>
    findByOrgId(id: string): Promise<Org| null>
}


export { OrgRepository };
