import prisma from '@/lib/db';
import { Request, Response } from 'express';

export const totalSales = async (req: Request, res: Response) => {
  try {
    const result = await prisma.store.count();
    res
      .status(200)
      .json({ message: 'total stores fetched successfully', result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'stores fetch failed server is not responding' });
  }
};
