import { NextResponse } from "next/server";
import { createTrek } from "@/actions/trek";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { destination, duration, description, fare, images } = body;

    const trek = await createTrek({
      destination,
      duration,
      description,
      fare,
      images,
    });

    return NextResponse.json(
      { success: true, data: trek },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create trek",
      },
      { status: 400 }
    );
  }
}
