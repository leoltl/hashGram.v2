import { Prisma } from ".prisma/client";

export const PrismaErrorHandler = (e: any) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2002') {
      // @TODO: wrap this into a db Error.
      // retrieve e.meta.target to see the path.
      throw new Error(
        `There is a unique constraint violation.`
      )
    }
  }
  return e;
}