"use server";

import dbConnect from "@/lib/dbConnect";
import ItenararyModel from "@/models/Itenarary";

interface CreateItenararyParams {
  trekId: string;
  campId: string;
  orderNo: number;
  distanceFromSource: number;
}

export const createItenarary = async (data: CreateItenararyParams) => {
  try {
    await dbConnect();


    const newItenarary = await ItenararyModel.create(data);

    if(!newItenarary){
        throw new Error("Failed to create itinerary");
    }

    return JSON.parse(JSON.stringify(newItenarary));
  } catch (error: any) {
    console.error("Error creating itinerary:", error);
    throw new Error(error.message || "Failed to create itinerary");
  }
};


export const deleteItenarariesByTrekId = async (trekId: string) => {
  try {
    if (!trekId) {
        throw new Error("Trek ID is required");
    }

    await dbConnect();

    const result = await ItenararyModel.deleteMany({ trekId });

    if (result.deletedCount === 0) {
        console.log("No itineraries found for this trekId to delete.");
    }

    return { 
        success: true, 
        message: `Successfully deleted ${result.deletedCount} itinerary entries.` 
    };
  } catch (error: any) {
    console.error("Error deleting itineraries:", error);
    throw new Error(error.message || "Failed to delete itineraries");
  }
};