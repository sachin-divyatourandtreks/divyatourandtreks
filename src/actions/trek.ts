"use server";

import dbConnect from "@/lib/dbConnect";
import Trek from "@/models/Trek";
import { deleteItenarariesByTrekId } from "./itenarary";

interface CreateTrekParams {
  destination: string;
  duration: number;
  description: string;
  fare: number;
  images: string[];
}

interface UpdateTrekParams extends Partial<CreateTrekParams> {
  trekId: string;
}

export const getAllTrekInfo = async () => {
  await dbConnect();
  const treks = await Trek.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(treks));
};

export const createTrek = async (data: CreateTrekParams) => {
  await dbConnect();

  if (!data.destination || !data.description || !data.duration || !data.fare) {
    throw new Error("All required fields must be provided");
  }

  const trek = await Trek.create(data);
  return JSON.parse(JSON.stringify(trek));
};

export const updateTrekInfo = async (data: UpdateTrekParams) => {
  if (!data.trekId) {
    throw new Error("Trek ID is required");
  }

  await dbConnect();

  const updatedTrek = await Trek.findOneAndUpdate(
    { trekId: data.trekId },
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!updatedTrek) {
    throw new Error("Trek not found");
  }

  return JSON.parse(JSON.stringify(updatedTrek));
};

export const deleteTrek = async (trekId: string) => {
  await dbConnect();

  const deletedTrek = await Trek.findOneAndDelete({ trekId });

  if (!deletedTrek) {
    throw new Error("Trek not found");
  }

  await deleteItenarariesByTrekId(deletedTrek.trekId);

  return { success: true };
};

export const addImageToTrek = async (trekId: string, imageUrl: string) => {
  await dbConnect();

  const updatedTrek = await Trek.findOneAndUpdate(
    { trekId },
    { $push: { images: imageUrl } },
    { new: true }
  );

  if (!updatedTrek) {
    throw new Error("Trek not found");
  }

  return JSON.parse(JSON.stringify(updatedTrek));
};
