const { PrismaClient } = require('../../__generated__/client');
const prisma = new PrismaClient();

const { POSTS } = require("@leoltl/infra");

async function main() {
  // clear db
  await prisma.post.deleteMany({});

  // insert posts seed

  await prisma.post.createMany(
    { data: Object.values(POSTS) }
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