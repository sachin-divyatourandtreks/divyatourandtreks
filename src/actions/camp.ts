"use server";

import CampModel from "@/models/Camp";
import dbConnect from "@/lib/dbConnect";

interface CreateCampParams {
  name: string;
  description?: string;
}

export const createCamp = async (campData: CreateCampParams) => {
  try {
    await dbConnect();

    const newCamp = await CampModel.create(campData);

    return JSON.parse(JSON.stringify(newCamp));
  } catch (error: any) {
    console.error("Error while creating a camp:", error.message);
    throw new Error(error.message || "Failed to create camp");
  }
};

export const deleteCampByName = async (campName: string) => {
  try {
    await dbConnect();

    const deletedCamp = await CampModel.findOneAndDelete({ name: campName });

    if (!deletedCamp) {
      throw new Error("Camp not found");
    }

    return { success: true, message: "Camp deleted successfully" };
  } catch (error: any) {
    console.error("Error while deleting a camp:", error.message);
    throw new Error(error.message || "Failed to delete camp");
  }
};