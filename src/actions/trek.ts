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
  try {
    await dbConnect();

    const treks = await Trek.find({}).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(treks));
  } catch (error: any) {
    console.error("Error fetching treks:", error);
    throw new Error(error.message || "Failed to fetch treks");
  }
};


export const createTrek = async (trekData: CreateTrekParams) => {
  try {
    await dbConnect();

    const newTrek = await Trek.create(trekData);

    return JSON.parse(JSON.stringify(newTrek));
  } catch (error: any) {
    console.error("Error creating trek:", error);
    throw new Error(error.message || "Failed to create trek");
  }
};

export const updateTrekInfo = async (data: UpdateTrekParams) => {
  try {
    if (!data.trekId) {
        throw new Error("Trek ID is required for updates");
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
  } catch (error: any) {
    console.error("Error updating trek:", error);
    throw new Error(error.message || "Failed to update trek");
  }
};

export const deleteTrek = async (trekName: string) => {
  try {
    await dbConnect();

    const deletedTrek = await Trek.findOneAndDelete({ trekName });

    if (!deletedTrek) {
      throw new Error("Trek not found");
    }

    await deleteItenarariesByTrekId(deletedTrek.trekId)

    return { success: true, message: "Trek deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting trek:", error);
    throw new Error(error.message || "Failed to delete trek");
  }
};


export const addImageToTrek = async (trekId: string, imageUrl: string) => {
  try {
    if (!trekId || !imageUrl) {
      throw new Error("Trek ID and Image URL are required");
    }

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
  } catch (error: any) {
    console.error("Error adding image to trek:", error);
    throw new Error(error.message || "Failed to add image");
  }
};