import { prisma } from "./server";

export default async function seed() {
  await prisma.textUser.deleteMany();
  await prisma.user.deleteMany();
  await prisma.text.deleteMany();
  let kamil = await prisma.user.create({
    data: {
      username: "kamil",
      password: "kamil",
    },
  });
  let rani = await prisma.user.create({
    data: {
      username: "rani",
      password: "rani",
    },
  });

  let text = await prisma.text.create({
    data: {
      text: "This is a text",
    },
  });

  await prisma.textUser.create({
    data: {
      percentage: 70,
      wpm: 40,
      textId: text.id,
      userId: rani.id,
    },
  });

  await prisma.textUser.create({
    data: {
      percentage: 39,
      wpm: 30,
      userId: kamil.id,
      textId: text.id,
    },
  });
  return "seeded database!";
}

export async function fetch() {
  let result = await prisma.user.findMany({
    include: {
      TextUser: {
        include: {
          Text: true,
        },
      },
    },
  });
  return result;
}
export async function fetch2() {
  let result = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      TextUser: {
        include: {
          Text: true,
        },
      },
    },
  });
  return result;
}

export async function update() {
  let result = await prisma.textUser.updateMany({
    data: {
      wpm: 90,
    },
  });
  return "updated!";
}

export async function remove() {
  let result = await prisma.textUser.deleteMany({
    where: {
      percentage: {
        gt: 50,
      },
    },
  });
  return result;
}
