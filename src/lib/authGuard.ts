import { authAdmin } from "@/lib/firebase-admin";


export const verifySession = async (token: string): Promise<string> => {
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  try {
    const decodedToken = await authAdmin.verifyIdToken(token);
  
    return decodedToken.uid; 
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Unauthorized: Invalid token");
  }
};