import { PrismaClient, UserRole, StoreStatus, StoreRoles, DeliveryStatus, PaymentStatus } from '@prisma/client';
import { config } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';

config();
const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Helper to generate random dates within the last year from Dec 28, 2025
function getRandomDate() {
  const end = new Date('2025-12-28');
  const start = new Date('2024-12-28');
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log("Emptying database...");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Comment", "Review", "OrderItem", "Order", "ProductPriceHistory", "Product", "Category", "StoreAccess", "Follower", "StoreProfile", "Store", "Contact", "Address", "UserProfile", "manyUsers", "Role", "User", "StoreCounts" RESTART IDENTITY CASCADE;`);

  // // 1. Roles
  // const adminRole = await prisma.role.create({ data: { name: UserRole.ADMIN } });
  // const userRole = await prisma.role.create({ data: { name: UserRole.USER } });
  const superAdminRole = await prisma.role.create({ data: { name: UserRole.SUPER_ADMIN } });

  // 2. Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Electronics' } }),
    prisma.category.create({ data: { name: 'Clothing' } }),
  ]);

  // 3. Create Store Owner (Store ID 1)
  const owner = await prisma.user.create({
    data: {
      name: "Store Owner",
      email: "owner@store1.com",
      password: "password123",
      roles: { create: { roleId: superAdminRole.id } }
    }
  });

  const ownerProfile = await prisma.userProfile.create({
    data: { userId: owner.id, imageUrl: "https://picsum.photos/200", description: "Owner" }
  });

  const ownerAddress = await prisma.address.create({
    data: { userId: owner.id, profileId: ownerProfile.id, Street1: "Owner St", province: "Kashmir", state: "Mirpur", zip: "10250" }
  });

  const store1 = await prisma.store.create({
    data: {
      userId: owner.id,
      status: StoreStatus.ACTIVE,
      profile: { create: { name: "Main Store 1", description: "Target Store" } },
      roles: { create: { userId: owner.id, permissions: StoreRoles.OWNER } }
    }
  });

  // 4. Products for Store 1
  const products = [];
  for (let p = 1; p <= 5; p++) {
    const prod = await prisma.product.create({
      data: {
        title: `Store1 Product ${p}`,
        price: 100 + p,
        stock: 500,
        categoryId: categories[0].id,
        storeId: store1.id,
        priceHistory: { create: { price: 100 + p } }
      }
    });
    products.push(prod);
  }

  // 5. Generate 25 Orders for Store 1
  console.log("Generating 25 orders for storeId 1...");
  for (let i = 1; i <= 25; i++) {
    const orderDate = getRandomDate();
    
    const order = await prisma.order.create({
      data: {
        amount: 30 + i++,
        userId: owner.id,
        addressId: ownerAddress.id,
        deliveryStatus: DeliveryStatus.DELIVERED,
        paymentStatus: PaymentStatus.PAID,
        trackingId: `TRK-${i}-${Math.random().toString(36).substring(5).toUpperCase()}`,
        createdAt: orderDate,
        updatedAt: orderDate,
      }
    });

    // Create 1-3 items per order
    const itemCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < itemCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          storeId: store1.id,
          quantity: Math.floor(Math.random() * 5) + 1,
          productAtPrice: product.price
        }
      });
    }
  }

  console.log("✅ Seed finished. 25 orders created for Store ID 1 within the last year.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });