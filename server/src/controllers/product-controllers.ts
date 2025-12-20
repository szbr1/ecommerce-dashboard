import prisma from '@/lib/db';
import type { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      imageUrl,
      sold,
      categoryId,
      storeId,
    } = req.body;

    const result = await prisma.product.create({
      data: {
        title,
        description,
        price,
        stock,
        imageUrl,
        sold,
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
    const {
      productId,
      title,
      description,
      price,
      stock,
      sub_title,
      imageUrl
    } = req.body;

    const result = await prisma.product.update({
      where : {id: productId},
      data: {
        title,
        stock,
        price,
        description,
        sub_title,
        imageUrl
      }
         });
    res.status(200).json({ message: 'successfully updated a product', result });
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

export const totalProducts = async (req: Request, res: Response)=>{
    try {
        const result = await prisma.product.count()        
        res.status(200).json({message: "successfully fetched all products", result})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "all products fetch failed server is not responding"})
    }
}

