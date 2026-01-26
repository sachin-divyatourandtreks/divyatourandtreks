import { NextRequest, NextResponse } from "next/server";
import { 
  getUserInfo, 
  createUser, 
  updateInfo, 
  deleteUser 
} from "@/actions/user";
import dbConnect from "@/lib/dbConnect";

const getToken = (req: NextRequest): string => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }
  return authHeader.split("Bearer ")[1];
};


export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const token = getToken(req);
    const user = await getUserInfo(token);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Unauthorized" }, 
      { status: 401 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getToken(req);
    const body = await req.json();

    const newUser = await createUser(token, body);

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 400 } 
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = getToken(req);
    const body = await req.json();

    const updatedUser = await updateInfo(token, body);

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const token = getToken(req);
    
    await deleteUser(token);

    return NextResponse.json(
      { success: true, message: "User deleted successfully" }, 
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}