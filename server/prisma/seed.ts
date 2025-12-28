import {
  PrismaClient,
} from '@prisma/client';
import { config } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';


config();
const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Create User
  const user = await prisma.user.upsert({
    where: { email: 'shahzaib@example.com' },
    update: {},
    create: {
      name: 'Shahzaib Mirza',
      email: 'shahzaib@example.com',
      password: 'hashed_password_here', // Use bcrypt in real scenarios
    },
  });

  // 2. Create User Profile (Required for Address/Contact relations)
  const profile = await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      imageUrl: 'https://avatar.com/shahzaib.png',
      description: 'Fullstack Developer',
    },
  });

  // 3. Create Store
  const store = await prisma.store.create({
    data: {
      userId: user.id,
      profile: {
        create: {
          name: 'Tech Store',
          description: 'Official store for gadgets',
        },
      },
    },
  });

  // 4. Create Address
  await prisma.address.create({
    data: {
      userId: user.id,
      profileId: profile.id,
      Street1: 'Street 1, Palak',
      province: 'Azad Kashmir',
      state: 'Mirpur',
      zip: '10250',
    },
  });

  // 5. Create Category & Product (Required for Review)
  const category = await prisma.category.create({
    data: { name: 'Electronics' },
  });

  const product = await prisma.product.create({
    data: {
      title: 'Mechanical Keyboard',
      price: 50.0,
      stock: 100,
      categoryId: category.id,
      storeId: store.id,
    },
  });

  // 6. Create Review
  await prisma.review.upsert({
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
      stars: 5,
      comment: 'Excellent build quality!',
    },
  });

  console.log('Seed completed: User, Profile, Store, Address, and Review created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });