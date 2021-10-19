const { PrismaClient } = require('../../__generated__/client');
const prisma = new PrismaClient();

const { USERS, FOLLOWINGS } = require("@leoltl/infra");

async function main() {

  // clear following db
  await prisma.following.deleteMany({});

  // clear user db
  await prisma.user.deleteMany({});

  // insert user seed
  await prisma.user.createMany(
    { data: Object.values(USERS) }
  )

  // insert following seed
  await prisma.following.createMany(
    { data: Object.values(FOLLOWINGS) }
  )

}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })