import prisma from '@/lib/db';
import { Request, Response } from 'express';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const result = await prisma.category.create({
      data: {
        name,
      },
    });

    return res
      .status(200)
      .json({ message: 'successfully created store', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'unsuccessfully while creating' });
  }
};


export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.body;

    const result = await prisma.category.delete({
      where: {
        id: categoryId
      },
    });

    return res
      .status(200)
      .json({ message: 'successfully created store', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'unsuccessfully while creating' });
  }
};

export const totalCategories = async (req: Request, res: Response) => {
  try {
    const count = await prisma.category.count();  

    return res.status(200).json({ message: 'total categories', count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'unable to fetch total categories' });
  }
};