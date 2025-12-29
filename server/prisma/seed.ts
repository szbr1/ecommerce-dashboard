import {
  PrismaClient,
  UserRole,
  StoreStatus,
  StoreRoles,
  DeliveryStatus,
  PaymentStatus,
} from '@prisma/client';
import { config } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';

config();
const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

/**
 * HELPER FUNCTIONS
 */
function getRandomDate(startYear: number, endYear: number, monthsRange?: { start: number; end: number }) {
  const start = new Date(`${startYear}-01-01`);
  const end = new Date(`${endYear}-12-31`);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  if (monthsRange) {
    // Force month into Jan (0) - Feb (1) range for the specific "months filter" requirement
    const month = Math.floor(Math.random() * (monthsRange.end - monthsRange.start + 1)) + monthsRange.start;
    date.setMonth(month);
  }
  return date;
}

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

async function main() {
  console.log("Emptying database...");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Comment", "Review", "OrderItem", "Order", "ProductPriceHistory", "Product", "Category", "StoreAccess", "Follower", "StoreProfile", "Store", "Contact", "Address", "UserProfile", "manyUsers", "Role", "User", "StoreCounts" RESTART IDENTITY CASCADE;`);

  // 1. Roles
  const superAdminRole = await prisma.role.create({ data: { name: UserRole.SUPER_ADMIN } });
  const userRole = await prisma.role.create({ data: { name: UserRole.USER } });

  // 2. Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Electronics' } }),
    prisma.category.create({ data: { name: 'Apparel' } }),
    prisma.category.create({ data: { name: 'Home & Kitchen' } }),
  ]);

  // 3. Create Store Owner & Store
  const owner = await prisma.user.create({
    data: {
      name: "Shahzaib Mirza",
      email: "shahzaib@mirza.com",
      password: "securepassword123",
      roles: { create: { roleId: superAdminRole.id } }
    }
  });

  const ownerProfile = await prisma.userProfile.create({
    data: { userId: owner.id, imageUrl: "https://i.pravatar.cc/150?u=owner", description: "Lead Developer & Store Owner" }
  });

  await prisma.address.create({
    data: { userId: owner.id, profileId: ownerProfile.id, Street1: "Main Road", province: "Azad Kashmir", state: "Mirpur", zip: "10250" }
  });

  const store = await prisma.store.create({
    data: {
      id: 1, // Explicitly ID 1
      userId: owner.id,
      status: StoreStatus.ACTIVE,
      profile: { 
        create: { 
          name: "Mirza Tech Hub", 
          description: "Premium electronics and high-quality apparel store.",
          avatarUrl: "https://logo.clearbit.com/google.com",
          banner: "https://picsum.photos/1200/400"
        } 
      },
      roles: { create: { userId: owner.id, permissions: StoreRoles.OWNER } }
    }
  });

  // 4. Products
  const productData = [
    { title: "Mechanical Keyboard", price: 120, cat: 0 },
    { title: "Wireless Mouse", price: 45, cat: 0 },
    { title: "Oversized Cotton Hoodie", price: 60, cat: 1 },
    { title: "Slim Fit Chinos", price: 50, cat: 1 },
    { title: "Air Fryer 5L", price: 150, cat: 2 },
  ];

  const products = [];
  for (const p of productData) {
    const prod = await prisma.product.create({
      data: {
        title: p.title,
        price: p.price,
        stock: 100,
        categoryId: categories[p.cat].id,
        storeId: store.id,
        priceHistory: { create: { price: p.price } }
      }
    });
    products.push(prod);
  }

  // 5. Seed Users (Customers & Followers)
  const customers = [];
  for (let i = 1; i <= 20; i++) {
    const cust = await prisma.user.create({
      data: {
        name: `Customer ${i}`,
        email: `customer${i}@example.com`,
        password: "password123",
        roles: { create: { roleId: userRole.id } }
      }
    });
    const profile = await prisma.userProfile.create({ data: { userId: cust.id, imageUrl: `https://i.pravatar.cc/150?u=${i}`, description: "Regular Shopper" } });
    await prisma.address.create({ data: { userId: cust.id, profileId: profile.id, Street1: `${i} Customer St`, province: "Punjab", state: "Lahore", zip: "54000" } });
    customers.push(cust);
  }

  // 6. Followers Linked with Years (Incremental)
  console.log("Generating Followers...");
  for (let year = 2020; year <= 2025; year++) {
    const count = (year - 2019) * 3; // Increases every year
    for (let i = 0; i < count; i++) {
      const user = getRandomItem(customers);
      await prisma.follower.upsert({
        where: { id: -1 }, // Dummy check for creation
        create: { storeId: store.id, userId: user.id, createdAt: getRandomDate(year, year) },
        update: {}
      });
    }
  }

  // 7. Orders (Last 6 Years & Jan-Feb Filter)
  console.log("Generating Orders across 6 years...");
  const deliveryStatuses = [DeliveryStatus.DELIVERED, DeliveryStatus.PENDING, DeliveryStatus.SHIPPED, DeliveryStatus.COMPLETED, DeliveryStatus.CANCELLED];
  const paymentStatuses = [PaymentStatus.PAID, PaymentStatus.UNPAID, PaymentStatus.PENDING, PaymentStatus.FAILED, PaymentStatus.RETURN];

  for (let i = 1; i <= 100; i++) {
    const isSpecialFilterRange = i > 80; // Make some orders specifically for the Jan/Feb 2025 filter
    const year = isSpecialFilterRange ? 2025 : Math.floor(Math.random() * (2025 - 2020 + 1)) + 2020;
    const orderDate = getRandomDate(year, year, isSpecialFilterRange ? { start: 0, end: 1 } : undefined);

    const customer = getRandomItem(customers);
    const address = await prisma.address.findFirst({ where: { userId: customer.id } });

    const order = await prisma.order.create({
      data: {
        userId: customer.id,
        addressId: address!.id,
        amount: 0, // Calculated below
        deliveryStatus: getRandomItem(deliveryStatuses),
        paymentStatus: getRandomItem(paymentStatuses),
        trackingId: `TRK-${Math.random().toString(36).substring(7).toUpperCase()}`,
        createdAt: orderDate,
        updatedAt: orderDate,
      }
    });

    let totalAmount = 0;
    const itemCount = Math.floor(Math.random() * 2) + 1;
    for (let j = 0; j < itemCount; j++) {
      const product = getRandomItem(products);
      const qty = Math.floor(Math.random() * 2) + 1;
      const price = Number(product.price);
      totalAmount += price * qty;

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          storeId: store.id,
          quantity: qty,
          productAtPrice: price
        }
      });
    }
    await prisma.order.update({ where: { id: order.id }, data: { amount: totalAmount } });
  }

  // 8. Real Reviews
  console.log("Creating Reviews...");
  const reviewPool = [
    { stars: 5, text: "Excellent build quality, highly recommend!" },
    { stars: 4, text: "Good product but shipping was a bit slow." },
    { stars: 2, text: "Stopped working after a week. Not happy." },
    { stars: 5, text: "Best value for money in this category." },
    { stars: 3, text: "Average quality, matches the price." }
  ];

  for (const product of products) {
    for (let k = 0; k < 3; k++) {
      const reviewer = getRandomItem(customers);
      const reviewData = getRandomItem(reviewPool);
      await prisma.review.upsert({
        where: { userId_productId: { userId: reviewer.id, productId: product.id } },
        create: {
          productId: product.id,
          userId: reviewer.id,
          comment: reviewData.text,
          stars: reviewData.stars,
        },
        update: {}
      });
    }
  }

  console.log("✅ Seed finished successfully.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });