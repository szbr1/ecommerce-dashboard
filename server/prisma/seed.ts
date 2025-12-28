import {
  PrismaClient,
} from '@prisma/client';
import { config } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';

import { UserRole, StoreStatus, StoreRoles } from '@prisma/client';



config();
const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });



async function main() {
  console.log("Emptying database...");
  
  // Robust Reset for PostgreSQL
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Comment", "Review", "OrderItem", "Order", "ProductPriceHistory", "Product", "Category", "StoreAccess", "Follower", "StoreProfile", "Store", "Contact", "Address", "UserProfile", "manyUsers", "Role", "User", "StoreCounts" RESTART IDENTITY CASCADE;`);

  // 1. Create Roles
   await prisma.role.create({ data: { name: UserRole.ADMIN } });
  const userRole = await prisma.role.create({ data: { name: UserRole.USER } });
  const superAdminRole = await prisma.role.create({ data: { name: UserRole.SUPER_ADMIN } });

  // 2. Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Electronics' } }),
    prisma.category.create({ data: { name: 'Clothing' } }),
    prisma.category.create({ data: { name: 'Home & Kitchen' } }),
    prisma.category.create({ data: { name: 'Books' } }),
  ]);

  // 3. Seed Loop
  for (let i = 1; i <= 5; i++) {
    // Create User first
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: 'password123',
        roles: {
          create: { roleId: i === 1 ? superAdminRole.id : userRole.id }
        }
      }
    });

    // Create Profile second
    const profile = await prisma.userProfile.create({
      data: {
        userId: user.id,
        imageUrl: `https://picsum.photos/seed/user${i}/200`,
        description: `Bio for User ${i}. Junior Fullstack Developer.`,
      }
    });

    // Create Contact (Linked to both)
    await prisma.contact.create({
      data: {
        userId: user.id,
        profileId: profile.id,
        contact1: 923000000 + i,
        email: `contact${i}@example.com`
      }
    });

    // Create Addresses
    await prisma.address.create({
      data: {
        userId: user.id,
        profileId: profile.id,
        Street1: `${i}23 Main St`,
        province: 'Azad Kashmir',
        state: 'Mirpur',
        zip: `1025${i}`,
      }
    });

    // 4. Store
    const store = await prisma.store.create({
      data: {
        userId: user.id,
        status: StoreStatus.ACTIVE,
        profile: {
          create: {
            name: `${user.name}'s Shop`,
            description: `Store description for ${user.name}`,
            avatarUrl: `https://picsum.photos/seed/store${i}/100`,
          }
        },
        roles: {
          create: { userId: user.id, permissions: StoreRoles.OWNER }
        }
      }
    });

    // 5. Products & History
    for (let p = 1; p <= 5; p++) {
      const product = await prisma.product.create({
        data: {
          title: `Product ${p} - Store ${i}`,
          description: `High performance product ${p}`,
          imagesUrl: [`https://picsum.photos/seed/p${i}${p}/500`],
          price: 50.00 + (p * 10),
          stock: 100,
          categoryId: categories[Math.floor(Math.random() * categories.length)].id,
          storeId: store.id,
          priceHistory: {
            create: { price: 50.00 + (p * 10) }
          }
        }
      });

      // 6. Review
      await prisma.review.create({
        data: {
          userId: user.id,
          productId: product.id,
          stars: 5,
          comment: "Excellent quality!",
        }
      });
    }
  }

  console.log("✅ Seed successful with complex relations.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });