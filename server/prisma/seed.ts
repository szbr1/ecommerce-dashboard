import { PrismaClient, UserRole, StoreStatus, StoreRoles, DeliveryStatus, PaymentStatus } from '@prisma/client';
import { config } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';

config();
const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Emptying database...");
  
  // Clean up existing data
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

    const profile = await prisma.userProfile.create({
      data: {
        userId: user.id,
        imageUrl: `https://picsum.photos/seed/user${i}/200`,
        description: `Bio for User ${i}. Junior Fullstack Developer.`,
      }
    });

    await prisma.contact.create({
      data: {
        userId: user.id,
        profileId: profile.id,
        contact1: 923000000 + i,
        email: `contact${i}@example.com`
      }
    });

    const address = await prisma.address.create({
      data: {
        userId: user.id,
        profileId: profile.id,
        Street1: `${i}23 Main St`,
        province: 'Azad Kashmir',
        state: 'Mirpur',
        zip: `1025${i}`,
      }
    });

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

    // 4. Products
    const createdProducts = [];
    for (let p = 1; p <= 3; p++) {
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
      createdProducts.push(product);

      await prisma.review.create({
        data: {
          userId: user.id,
          productId: product.id,
          stars: 5,
          comment: "Excellent quality!",
        }
      });
    }

    // 5. Orders & OrderItems (Fixed relations)
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        addressId: address.id,
        deliveryStatus: DeliveryStatus.PENDING,
        paymentStatus: PaymentStatus.PAID,
        trackingId: `TRK-${Math.random().toString(36).substring(7).toUpperCase()}`,
      }
    });

    for (const prod of createdProducts) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: prod.id,
          storeId: store.id,
          quantity: 2,
          productAtPrice: prod.price
        }
      });
    }
  }

  console.log("✅ Seed successful: Users, Stores, Products, Orders, and OrderItems created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });