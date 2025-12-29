import prisma from '@/lib/db';
import { Request, Response } from 'express';

export const totalUsers = async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.count();
    res
      .status(200)
      .json({ message: 'successfully fetched total users', result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'total users fetch failed server is not responding' });
  }
};

export const createProfile = async (req: Request, res: Response) => {
  try {
    const { imageUrl, description, userId } = req.body;
    const result = await prisma.userProfile.create({
      data: {
        imageUrl,
        description,
        userId,
      },
    });
    res.status(200).json({ message: 'successfully created profile', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'unable to create profile: failed server is not responding',
    });
  }
};

type CloudinaryType = Express.Multer.File & { path: string };
export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded. Ensure 'avatar' key is used." });
    }

    const file = req.file as CloudinaryType;

    const result = await prisma.user.update({
      where: {
        id: 1, // Todo
      },
      data: {
        profile: {
          connect: {
            userId: 1, // Todo
            imageUrl: file.path,
          },
        },
      },
    });

    res.status(200).json({ message: 'successfully created profile', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'unable to create profile: failed server is not responding',
    });
  }
};
