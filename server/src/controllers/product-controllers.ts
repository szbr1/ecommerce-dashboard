import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      imageUrl,
      categoryId,
      storeId,
    } = req.body;

    let imagesUrl: string[] = [];
 
    // SINGLE IMAGE UPLOAD
    if (typeof imageUrl === 'string' && imageUrl.trim()) {
       const imageData = await cloudinary.uploader.upload(imageUrl, {
       folder: "products"
       })

       imagesUrl = [imageData.secure_url]
    }
    // MULTIPLE IMAGES UPLOAD
    if (Array.isArray(imageUrl)) {

      const filterImages = imageUrl.filter(
        img => typeof img === 'string' && img.trim().length > 0
      );

      const uploading = filterImages.map(async img => {
        return await cloudinary.uploader.upload(img, { folder: 'products' });
      });

      const uploadingResult = await Promise.all(uploading);
      imagesUrl = uploadingResult.map(i => i.secure_url);
    }


    const result = await prisma.product.create({
      data: {
        title,
        description,
        price,
        stock,
        imagesUrl,
        store: {
          connect: {
            id: storeId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    res.status(200).json({ message: 'successfully created product', result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'product retreivig failed server is not responding' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId, title, description, price, stock, sub_title, imageUrl } =
      req.body;

    const ts: Prisma.ProductUpdateInput = {};
    let pushImages: string[];


     if(sub_title){
      ts.sub_title = sub_title
     }

     if(description){
      ts.description = description
     }

     if(title){
      ts.title = title
     }

     if(price){
      ts.price = price
     }

     if(stock){
      ts.stock = stock
     }
     
    

     // MULTIPLE IMAGES UPLOAD
    if (Array.isArray(imageUrl)) {

      const filterImages = imageUrl.filter(
        img => typeof img === 'string' && img.trim().length > 0
      );

      const uploading = filterImages.map(async img => {
        return await cloudinary.uploader.upload(img, { folder: 'products' });
      });

      const uploadingResult = await Promise.all(uploading);
      pushImages = uploadingResult.map(i => i.secure_url);
    }

     if (typeof imageUrl === 'string' && imageUrl.trim()) {
       const imageData = await cloudinary.uploader.upload(imageUrl, {
       folder: "products"
       })

       pushImages = [imageData.secure_url]
    }

    if (Array.isArray(imageUrl)) {
      pushImages = imageUrl.filter(img => {
        return typeof img === 'string' && img.trim().length > 2;
      });
    }

    const transaction = await prisma.$transaction(async tx => {
      const product = await tx.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          price: true,
          id: true,
        },
      });

      if (!product) {
        throw new Error('product not found');
      }

      if (price !== undefined && product.price !== price) {
        await tx.productPriceHistory.create({
          data: {
            productId: product.id,
            price: product.price,
          },
        });
      }

      if (pushImages && pushImages.length > 0) {
        ts.imagesUrl = { push: pushImages };
      }

      const result = await tx.product.update({
        where: { id: product.id },
        data: ts,
      });

      return result;
    });

    res
      .status(200)
      .json({ message: 'successfully updated a product', result: transaction });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'product retreivig failed server is not responding' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;

    const result = await prisma.product.delete({
      where: { id: productId },
    });

    return res.status(200).json({ message: 'successfully deleted', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'unsuccessfully while delteing' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 30
    const storeId = Number(req.query.storeId)

    const result = await prisma.product.findMany({
      skip: (page-1)*limit,
      where: { 
        storeId
       },
       take: limit,
       orderBy: {
        createdAt: "desc"
       },
       include: {
        category: true
       }
    });

    return res.status(200).json({ message: 'successfully fetched products', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'unsuccessfully while fetching products' });
  }
};

export const totalProducts = async (req: Request, res: Response) => {
  try {
    const result = await prisma.product.count();
    res
      .status(200)
      .json({ message: 'successfully fetched all products', result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'all products fetch failed server is not responding' });
  }
};

export const topSellingProduct = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.body;
    const result = await prisma.product.findMany({
      where: { orders: { some: { storeId } } },
      orderBy: {
        sold: 'desc',
      },
      take: 8,
      select: {
        id: true,
        imagesUrl: true,
        sold: true,
        title: true,
        description: true,
      },
    });

    res
      .status(200)
      .json({ message: 'successfully fetched all products', result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'all products fetch failed server is not responding' });
  }
};
