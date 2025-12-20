import { UserRole, StoreStatus, StoreRoles } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();
const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
async function main() {
  // 1. Clean Database
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

  // 2. Setup Roles
  const roles = await Promise.all([
    prisma.role.create({ data: { name: UserRole.SUPER_ADMIN } }),
    prisma.role.create({ data: { name: UserRole.ADMIN } }),
    prisma.role.create({ data: { name: UserRole.USER } }),
  ]);

  // 3. Create 20 Users with Profiles, Contacts, and Addresses
  const users = [];
  for (let i = 1; i <= 20; i++) {
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: "secure_password",
        roles: { create: { roleId: roles[2].id } }, // Default to USER
      },
    });

    const profile = await prisma.userProfile.create({
      data: {
        userId: user.id,
        imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`,
        description: `Bio for User ${i}`,
      },
    });

    await prisma.contact.create({
      data: {
        userId: user.id,
        profileId: profile.id,
        contact1: 923000000 + i,
        email: `contact${i}@example.com`,
      },
    });

    await prisma.address.create({
      data: {
        userId: user.id,
        profileId: profile.id,
        state: "State Name",
        province: "Province Name",
        Street1: `${i} Main St`,
      },
    });
    users.push(user);
  }

  // 4. Create 5 Stores
  const stores = [];
  for (let i = 1; i <= 5; i++) {
    const store = await prisma.store.create({
      data: {
        name: `Store ${i}`,
        userId: users[i % 20].id,
        status: StoreStatus.ACTIVE,
        roles: {
          create: { userId: users[i % 20].id, permissions: StoreRoles.OWNER },
        },
      },
    });
    stores.push(store);
  }

  // 5. Create Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Electronics" } }),
    prisma.category.create({ data: { name: "Clothing" } }),
    prisma.category.create({ data: { name: "Home & Garden" } }),
  ]);

  // 6. Create 30 Products
  const products = [];
  for (let i = 1; i <= 30; i++) {
    const product = await prisma.product.create({
      data: {
        title: `Product ${i}`,
        price: (Math.random() * 100 + 10).toFixed(2),
        stock: Math.floor(Math.random() * 100),
        categoryId: categories[i % 3].id,
        storeId: stores[i % 5].id,
      },
    });
    products.push(product);
  }

  // 7. Create 50 Orders
  for (let i = 1; i <= 50; i++) {
    const user = users[i % 20];
    const address = await prisma.address.findFirst({ where: { userId: user.id } });

    await prisma.order.create({
      data: {
        userId: user.id,
        addressId: address!.id,
        orderItems: {
          create: {
            productId: products[i % 30].id,
            storeId: products[i % 30].storeId,
            quantity: Math.floor(Math.random() * 3) + 1,
            productAtPrice: products[i % 30].price,
          },
        },
      },
    });
  }

  // 8. Create 100 Reviews and Comments
  for (let i = 1; i <= 100; i++) {
    const user = users[i % 20];
    const product = products[i % 30];

    // Use upsert for reviews to avoid @@unique([userId, productId]) collisions
    const review = await prisma.review.upsert({
      where: {
        userId_productId: {
          userId: user.id,
          productId: product.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        productId: product.id,
        comment: `This is review number ${i}`,
      },
    });

    await prisma.comment.create({
      data: {
        message: `Reply to review ${i}`,
        reviewId: review.id,
        commenterId: users[(i + 1) % 20].id,
      },
    });
  }

  console.log("Database Seeded: 20 Users, 5 Stores, 30 Products, 50 Orders, 100 Reviews.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });