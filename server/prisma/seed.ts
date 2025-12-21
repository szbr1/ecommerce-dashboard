import {
  PrismaClient,
  UserRole,
  StoreStatus,
  StoreRoles,
} from '@prisma/client';
import { config } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';


config();
const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const today = new Date('2025-12-21T12:00:00Z');

function randomPrice() {
  return Math.round((Math.random() * 100 + 10) * 100) / 100;
}

function randomDateBetween(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

async function cleanDatabase() {
  await prisma.comment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.follower.deleteMany();
  await prisma.storeAccess.deleteMany();
  await prisma.store.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.address.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.manyUsers.deleteMany();
  await prisma.role.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  console.log('🧹 Cleaning database...');
  await cleanDatabase();

  console.log('👤 Creating roles...');
  const userRole = await prisma.role.create({
    data: { name: UserRole.USER },
  });

  console.log('👥 Creating users...');
  const users = [];
  for (let i = 1; i <= 20; i++) {
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: 'secure_password',
        roles: { create: { roleId: userRole.id } },
      },
    });

    const profile = await prisma.userProfile.create({
      data: {
        userId: user.id,
        imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`,
        description: 'Bio',
      },
    });

    await prisma.contact.create({
      data: {
        userId: user.id,
        profileId: profile.id,
        contact1: 923000000 + i,
        email: `c${i}@ex.com`,
      },
    });

    await prisma.address.create({
      data: {
        userId: user.id,
        profileId: profile.id,
        state: 'State',
        province: 'Province',
        Street1: 'Street',
      },
    });

    users.push(user);
  }

  console.log('🏪 Creating stores...');
  const stores = [];
  for (let i = 0; i < 5; i++) {
    const store = await prisma.store.create({
      data: {
        name: `Store ${i + 1}`,
        userId: users[i].id,
        status: StoreStatus.ACTIVE,
        roles: {
          create: {
            userId: users[i].id,
            permissions: StoreRoles.OWNER,
          },
        },
      },
    });
    stores.push(store);
  }

  console.log('📦 Creating categories...');
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Electronics' } }),
    prisma.category.create({ data: { name: 'Clothing' } }),
    prisma.category.create({ data: { name: 'Home & Garden' } }),
  ]);

  console.log('🛒 Creating products...');
  const products = [];
  for (let i = 0; i < 60; i++) {
    const product = await prisma.product.create({
      data: {
        title: `Product ${i + 1}`,
        price: randomPrice(),
        stock: Math.floor(Math.random() * 100),
        categoryId: categories[i % 3].id,
        storeId: stores[i % 5].id,
      },
    });
    products.push(product);
  }

  console.log('📑 Creating orders...');

  const ranges = [
    // Today
    { count: 5, start: today, end: today },

    // Last 7 days
    {
      count: 15,
      start: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
      end: today,
    },

    // Last 30 days
    {
      count: 20,
      start: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
      end: today,
    },

    // Last 12 months (rolling)
    {
      count: 30,
      start: new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000),
      end: today,
    },

    // Previous calendar year (2024)
    {
      count: 30,
      start: new Date('2024-01-01T00:00:00Z'),
      end: new Date('2024-12-31T23:59:59Z'),
    },
  ];

  let orderIndex = 0;

  for (const range of ranges) {
    for (let i = 0; i < range.count; i++) {
      const user = users[orderIndex % users.length];
      const address = await prisma.address.findFirst({
        where: { userId: user.id },
      });

      const createdAt = randomDateBetween(range.start, range.end);
      const product = products[orderIndex % products.length];

      await prisma.order.create({
        data: {
          userId: user.id,
          addressId: address!.id,
          createdAt,
          orderItems: {
            create: {
              productId: product.id,
              storeId: product.storeId,
              quantity: Math.floor(Math.random() * 3) + 1,
              productAtPrice: product.price,
            },
          },
        },
      });

      orderIndex++;
    }
  }

  console.log('✅ Seeding complete — analytics-ready data created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
